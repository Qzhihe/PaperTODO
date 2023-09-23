import Link from "next/link";

import { Avatar } from "@mui/material";

import OAuthList from "./components/OAuthList";

export default function Page() {
  return (
    <div
      className="flex justify-center h-full
        before:content-[''] before:absolute before:w-[104%] before:h-[104%]
        before:bg-[url('/sunset.jpg')] before:bg-cover before:bg-center before:bg-no-repeat before:blur
        before:z-[-10]"
    >
      <div
        className="absolute top-[30%] flex flex-col items-center gap-2 p-4
          before:content-[''] before:absolute before:top-0 before:w-full before:h-full
          before:rounded before:shadow-2xl before:bg-[#ffffffaf]
          before:z-[-5]"
      >
        <Avatar className="bg-orange-500" />
        <h1 className="text-2xl">登录</h1>

        <OAuthList />

        <div className="flex justify-between w-full">
          <a className="text-sm">{"其他登录"}</a>
          <Link className="text-sm" href="/">
            {"返回首页"}
          </Link>
        </div>
      </div>
    </div>
  );
}
