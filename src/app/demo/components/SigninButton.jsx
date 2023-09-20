"use client";

import { signIn } from "next-auth/react";

const SigninButton = ({ provider, className, children }) => {
  function handleGitHubSignin() {
    signIn(provider);
  }

  return (
    <button className={className} onClick={handleGitHubSignin}>
      {children}
    </button>
  );
};

export default SigninButton;
