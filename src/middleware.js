import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // const baseUrl = req.url;
    // const isAuthed = !!req.nextauth.token;
    // const { pathname } = req.nextUrl;

    // const sensitiveRoutes = ["/views", "/api/todo"];
    // const isSensitiveRoute = sensitiveRoutes.some((route) =>
    //   pathname.startsWith(route)
    // );

    // if (!isAuthed && isSensitiveRoute) {
    //   return NextResponse.redirect(new URL("/signin", baseUrl));
    // } else if (isAuthed && !isSensitiveRoute) {
    //   return NextResponse.redirect(new URL("/views/today", baseUrl));
    // }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        // 返回 true 是为了让上面的 middleware 去处理所有逻辑
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/signin", "/views/:path*", "/api/todo/:path*"],
};
