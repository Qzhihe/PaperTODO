"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { load as PoemLoader } from "jinrishici";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircle } from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Dialog,
  Snackbar,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

// import throttled from "../utils/throttled";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [poem, setPoem] = useState("试试点击↑");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // const randomPoem = throttled(
  //   () => {
  //     PoemLoader((result) => {
  //       setPoem(result.data.content);
  //     });
  //   },
  //   1000,
  //   snackbarOpen,
  //   setSnackbarOpen
  // );

  const randomPoem = () => {
    PoemLoader((result) => {
      setPoem(result.data.content);
    });
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-between w-full min-h-full px-16 py-8 bg-[url('/sunset.jpg')] bg-cover bg-center bg-no-repeat">
        <header className="grid auto-rows-min grid-cols-12 justify-items-end items-center shadow-none bg-none">
          <hr className="w-full col-span-12 border-black" />
          <a className="col-start-11 text-black no-underline" href="/api/auth/signin">
            Sign In
          </a>
          <a
            className="text-black"
            target="_blank"
            href="https://github.com/Qzhihe/Easy-TODO"
          >
            Github
          </a>
        </header>

        <div className="flex flex-col items-start">
          <h2 className="text-3xl">更轻 更简 更快</h2>
          <div className="flex items-baseline">
            <h1
              className="text-6xl select-none cursor-pointer"
              onClick={() => randomPoem()}
            >
              Paper TODO
            </h1>
            <FontAwesomeIcon
              className="w-2 m-2 text-green-500"
              icon={faCircle}
              beatFade
            />
          </div>
          <p>{poem}</p>
        </div>

        <div className="grid auto-rows-min grid-cols-2 items-center">
          <hr className="col-span-2 border-black" />
          <div>
            <p>
              关于项目 <br />
              这是一个简单的个人日程管理系统:D <br />
              7/10/2023 by Group 3
            </p>
          </div>
          <div className="justify-self-end">
            <p>进群交流</p>
            <Image
              src="/feishuQR.png"
              alt="飞书"
              width={64}
              height={64}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>飞书交流群</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Image src="/feishuQR.png" alt="feishu" width={256} height={256} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>关闭</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        message="点击过快！"
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Fragment>
  );
}
