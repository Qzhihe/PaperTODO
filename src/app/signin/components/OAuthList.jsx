"use client";

import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@mui/material";

import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function LoginForm() {
  function handleGitHubLogin() {
    signIn("github", { callbackUrl: "/views/today" });
  }

  return (
    <ul>
      <li className="flex items-center">
        <Button
          className="w-full"
          startIcon={<FontAwesomeIcon icon={faGithub} size="lg" />}
          onClick={handleGitHubLogin}
        >
          使用 GitHub 登录
        </Button>
      </li>
    </ul>
  );
}
