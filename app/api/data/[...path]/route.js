import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "app", "data");
const ALLOWED_FILES = ["meclisler.json", "etkinlikler.json", "calisma-gruplari.json", "haberler.json"];

async function getUsers() {
  const file = join(process.cwd(), "app", "data", "users.json");
  const data = await readFile(file, "utf-8");
  return JSON.parse(data);
}

async function isAuthenticated(request) {
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") return false;
  return true;
}

export async function GET(request, { params }) {
  try {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { filename } = await params;
    const safeName = filename.replace(/[^a-z0-9\-_.]/gi, "");

    if (!ALLOWED_FILES.includes(safeName)) {
      return NextResponse.json({ error: "Geçersiz dosya adı" }, { status: 400 });
    }

    const filePath = join(DATA_DIR, safeName);
    const data = await readFile(filePath, "utf-8");
    return NextResponse.json({ data: JSON.parse(data) });
  } catch (error) {
    return NextResponse.json(
      { error: "Dosya okunamadı: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { filename } = await params;
    const safeName = filename.replace(/[^a-z0-9\-_.]/gi, "");

    if (!ALLOWED_FILES.includes(safeName)) {
      return NextResponse.json({ error: "Geçersiz dosya adı" }, { status: 400 });
    }

    const body = await request.json();
    const filePath = join(DATA_DIR, safeName);
    await writeFile(filePath, JSON.stringify(body.data, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Kaydedildi" });
  } catch (error) {
    return NextResponse.json(
      { error: "Kaydedilemedi: " + error.message },
      { status: 500 }
    );
  }
}
