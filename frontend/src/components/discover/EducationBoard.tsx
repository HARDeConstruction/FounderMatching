import React from "react";
import EducationTag, { EduTag } from "@/components/discover/EducationTag";

const skills: EduTag[] = [
  { year: 2024, skill: "Artificial Intelligence" },
  { year: 2023, skill: "C++" },
  { year: 2022, skill: "Python" },
  { year: 2021, skill: "Ruby" },
  { year: 2020, skill: "React" }
];
const EducationBoard = () => {
  return (
    <div className="grid grid-cols-3">
      {skills.map((item,i) => (
        <EducationTag key={i} year={item.year} skill={item.skill}/>
      ))}
    </div>
  );
};

export default EducationBoard;
