import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const result = await db.user.findUnique({
            where: {
                email,
                password,
            },
        });

        if (!result) {
            return NextResponse.json(
                { error: "用户名或密码错误" },
                { status: 500 }
            );
        }

    return NextResponse.json({ success: "登录成功" }, { status: 200 });
    // return NextResponse.redirect(new URL("/views/today", request.url));
  } catch (err) {
    console.log(err);
  }
}
