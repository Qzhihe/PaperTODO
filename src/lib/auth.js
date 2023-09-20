import { getServerSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "./db";

export const authConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      httpOptions: {
        // 以防网络不好超时报错
        timeout: 1000 * 5 * 1,
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      const result = await db.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (!result) {
        token.id = user.id;
        return token;
      }

      return {
        id: result.id,
        name: result.name,
        email: result.email,
        image: result.image,
      };
    },
    async session({ session, token }) {
      if (!!token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }

      return session;
    },
  },
};

export function useServerSession() {
  return getServerSession(authConfig);
}
