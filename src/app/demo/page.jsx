import SigninButton from "./components/SigninButton";

export default function Page() {
  return (
    <div className="absolute top-[20%] flex flex-col">
      <h1 className="text-2xl">这里是验证 next-auth 的小 Demo</h1>

      <ul className="flex flex-col gap-4 mt-4">
        <li className="w-full">
          <SigninButton className="w-full border" provider="github">
            使用 GitHub 登录
          </SigninButton>
        </li>
      </ul>
    </div>
  );
}
