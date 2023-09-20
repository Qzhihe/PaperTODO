import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth";

// const handler = async (request, response) => {
//   // 在这里可以进一步对请求和响应进行处理
//   return await NextAuth(request, response, authConfig);
// };

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
