import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const UPLOAD_DIR = join(process.cwd(), "public", "img");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024;

async function getUsers() {
  const { readFile } = await import("fs/promises");
  const file = join(process.cwd(), "app", "data", "users.json");
  const data = await readFile(file, "utf-8");
  return JSON.parse(data);
}

async function isAuthenticated(request) {
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") return false;
  return true;
}

export async function POST(request) {
  try {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !file.size) {
      return NextResponse.json({ error: "Dosya seçilmedi" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Sadece JPEG, PNG, GIF, WebP ve SVG yüklenebilir" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Dosya boyutu 5MB'ı geçemez" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name.replace(/[^a-z0-9\-_.]/gi, "");
    const timestamp = Date.now();
    const fileName = `${timestamp}-${originalName}`;
    const filePath = join(UPLOAD_DIR, fileName);

    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/img/${fileName}`,
      filename: fileName,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Yükleme başarısız: " + error.message },
      { status: 500 }
    );
  }
}
