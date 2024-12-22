import React from "react";
import EducationTag from "@/components/discover/EducationTag";

const EducationBoard = () => {
  return (
    <div className="flex flex-col w-1/2 pb-5 bg-primaryBG gap-3 rounded-lg px-3">
      <h1 className="my-2">Education</h1>
      <div className="grid grid-cols-3" >
        <EducationTag/>
        <EducationTag/>
        <EducationTag/>
        <EducationTag/>
        <EducationTag/>
        <EducationTag/>
      </div>
    </div>
  );
};

export default EducationBoard;
