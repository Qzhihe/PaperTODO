import { NextResponse } from "next/server";
import { validateUserToken } from "@/lib/validateUserToken";

export function middleware(request) {
  console.log("中间件", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: "/views/:path*",
};
