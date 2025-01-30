"use client";

import { useState } from "react";
import Feed from "@/components/Feed";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { useIsAuthenticated } from "@/providers/Auth";

function LoggedIndex() {
  return (
    <>
      <Feed filters={`ordering=-created_at`} />
    </>
  );
}

export default function Home() {
  const isAuthenticated = useIsAuthenticated();
  const [loginFormVisibility, setLoginFormVisibility] = useState("block");
  const [signupFormVisibility, setSignupFormVisibility] = useState("hidden");

  if (isAuthenticated) {
    return <LoggedIndex />;
  }
  return (
    <>
      <LoginForm
        className={loginFormVisibility}
        onClickOutside={() => {}}
        onSignupClick={() => {
          setLoginFormVisibility("hidden");
          setSignupFormVisibility("visible");
        }}
      />
      <SignupForm
        className={signupFormVisibility}
        onClickOutside={() => {}}
        onLoginClick={() => {
          setLoginFormVisibility("visible");
          setSignupFormVisibility("hidden");
        }}
      />
    </>
  );
}
