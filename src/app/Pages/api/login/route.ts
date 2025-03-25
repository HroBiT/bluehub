import { NextResponse } from "next/server";
import  prisma  from "@/lib/db"; // Zmieniono na named import
export async function POST(req: Request) {
  try {
    const { login, password } = await req.json();

    const user = await prisma.user.findFirst({
      where: { Login: login, password },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid login or password" }, { status: 401 });
    }

    return NextResponse.json({ login: user.Login, name: user.name, isAdmin: user.isAdmin, userId: user.id });
  } catch (error) {
    console.error("Error in login route:", error); // Logowanie błędu
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}