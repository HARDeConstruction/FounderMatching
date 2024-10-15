import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center w-16 ">
      <Image
        src="/images/VinUni-Logo-PNG.png"
        alt="VinUni Logo"
        width={60}
        height={60}
      />
      <h2 className="ml-4 text-2xl font-bold text-zinc-900 ">
        Founder Matching
      </h2>
    </div>
  );
};

export default Logo;
