import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

async function getUsers() {
  const file = join(process.cwd(), "app", "data", "users.json");
  const data = await readFile(file, "utf-8");
  return JSON.parse(data);
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const users = await getUsers();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Geçersiz kullanıcı adı veya şifre" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
      },
    });

    response.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Giriş yapılırken bir hata oluştu" },
      { status: 500 }
    );
  }
}
