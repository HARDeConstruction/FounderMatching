import React from "react";

export type EduTag = {
  skill ? : string;
  year ? : number;
}

const EducationTag = ({skill, year}: EduTag) => {
  return (
    <div className="flex flex-col bg-white mx-3 mb-3 rounded-lg p-2 gap-2">
      <h1 className="text-lg font-semibold">{year}</h1>
      <h1 className="font-semibold">{skill}</h1>
      <h1 className="text-wrap">
        #UI #UX #research #DesignSystem#Agile #wireframing
      </h1>
    </div>
  );
};

export default EducationTag;
