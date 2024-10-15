import Logo from "@/components/layout/logo";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import imagePath from "../../assets/image.png";
import SignUpBox from "@/components/layout/SignUpBox";
import LoginBox from "@/components/layout/LoginBox";

const SignUpPage = () => {
  return (
    <div className="flex-col w-screen h-screen">
      <div className="flex justify-between items-center pl-5 pr-10">
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
        className="flex h-full w-screen pt-10 pl-24 flex-row"
      >
        <div className="w-1/2">
          <Image alt="image" src={imagePath} width={600} height={600} />
        </div>
        <div className="mt-12 ml-14 w-1/2">
          <LoginBox />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
