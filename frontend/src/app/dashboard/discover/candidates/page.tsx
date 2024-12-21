import Image from "next/image";
import React from "react";
import image from "../../../assets/people.png";
import ExperienceBoard from "@/components/discover/ExperienceBoard";
import EducationBoard from "@/components/discover/EducationBoard";

const Profile = () => {
  return (
    <div className="flex flex-col gap-7 pb-10">
      <div className="flex flex-col">
        <h1 className="text-lg">Marketing (CMO)</h1>
        <div className="flex flex-row gap-2">
          <h2 className="text-sm">HarDeconstruction</h2>
          <h2 className="text-sm">Hanoi, Vietnam</h2>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <div className="w-36 h-36 ">
          <Image src={image} alt="people" className="size-fit" />
        </div>
        <div className="w-36 h-36 items-center justify-center bg-primaryBG rounded-lg p-3">
          <h1>Hello, I'm Gia Huy</h1>
          <h1>Software Engineer</h1>
        </div>
        <div className="bg-primaryBG rounded-lg p-3">
          <h1>Biography</h1>
          <ul className="list-inside list-disc text-sm">
            <li>
              Development of internal projects from scratch, product design of
              brands.
            </li>
            <li>Landing page, webapps and hybrid apps</li>
            <li>
              Taking decisions with stakeholders for the future of products such
              as Beagle labs, myur...
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-row gap-5">
      <ExperienceBoard/>
      <EducationBoard/>
      </div>
    </div>
  );
};

export default Profile;
