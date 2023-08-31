import { NextResponse } from "next/server";
import { validateUserToken } from "../../lib/validateUserToken";

// 尝试写一下中间件，位置不对，config没拦截住
export function middleware(request) {
    console.log('抓到了路由名单上的request', request);
    // 检测token是否有效
    // 如果有效，继续
    if (validateUserToken()) {
        return NextResponse.next();
    }
    // 如果无效，重定向回首页
    return NextResponse.rewrite(new URL("/", request.url));
}

export const config = {
    // 适配器：筛选出特定的路径允许中间件执行
    matcher: "/views/:path*",
};
