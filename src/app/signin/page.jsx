import { Fragment } from "react";
import { Avatar } from "@mui/material";

import LoginForm from "./components/LoginForm";

const Page = () => {
  // async function handleSubmit(event){
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const name = data.get("name");
  //   const pwd = data.get("password");

  //   try {
  //     const result = await doLogin(name, pwd);

  //     if (result.code === 20000) {
  //       localStorage.setItem("authToken", result.data.token);
  //       // navigate("/views/today", { replace: true });
  //     } else {
  //       providerRef.current.enqueueSnackbar("密码或账号错误", {
  //         anchorOrigin: { vertical: "right", horizontal: "top" },
  //         variant: "error",
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     providerRef.current.enqueueSnackbar("登陆失败，请重试！", {
  //       anchorOrigin: { vertical: "right", horizontal: "top" },
  //       variant: "error",
  //     });
  //   }
  // }

  return (
    <Fragment>
      <div className="grid grid-cols-10 h-full">
        <div className="col-span-6 bg-[url('/sunset.jpg')] bg-cover bg-center bg-no-repeat"></div>
        <div className="col-span-4">
          <div className="flex flex-col items-center mx-4 my-8">
            <Avatar className="m-4 bg-orange-500" />
            <h1 className="text-2xl">登录</h1>

            <LoginForm />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
