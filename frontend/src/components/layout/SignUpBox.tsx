"use client";
import React from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import SignInForm from "./SignUpForm";
import Image from "next/image";
import google from "../../assets/google.png";
import linkedin from "../../assets/linkedin.png";
import facebook from "../../assets/facebook.png";
import { useRouter } from "next/navigation";

const SignUpBox = () => {
  const router = useRouter();

  function toLoginIn() {
    router.push("/login");
  }

  return (
    <div className="w-[384px] bg-white h-fit p-10 rounded-2xl">
      <h1 className="text-center text-3xl font-extrabold mb-6">Sign Up</h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-around">
          <Image alt="google" src={google} width={20} height={20} />
          <Image alt="facebook" src={facebook} width={20} height={20} />
          <Image alt="linkedin" src={linkedin} width={20} height={20} />
        </div>
      </div>
      <h2 className="text-center text-xs mt-7">or</h2>
      <SignInForm />

      <div className="flex flex-row items-center justify-center mt-5">
        <h2 className="text-sm">Already have an account?</h2>
        <Button onClick={toLoginIn} variant="link" style={{ color: "#6836DD" }}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default SignUpBox;
