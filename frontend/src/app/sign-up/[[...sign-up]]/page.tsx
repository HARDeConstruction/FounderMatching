import Logo from "@/components/layout/logo";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import imagePath from "@/assets/signupimage.png";
import SignUpBox from "@/components/layout/SignUpBox";
import { SignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignUpPage = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="flex justify-between items-center px-6">
        <Logo />
        <div className="flex gap-2">
          <Button className="bg-primaryBlue hover:bg-blue-700">Login</Button>
          <Button className="bg-white text-primaryBlue hover:bg-white ring-1">
            Candidate Signup
          </Button>
        </div>
      </div>
      <div
        style={{ background: "#EBF5FF" }}
        className="flex flex-row h-full w-full"
      >
        <div className="flex items-center justify-center w-1/2">
          <SignUp routing="hash" signInUrl="/sign-in" fallbackRedirectUrl="/dashboard"/>
        </div>
        <div className="flex items-center justify-center w-1/2">
          <Image alt="image" src={imagePath} width={600} height={600} />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
