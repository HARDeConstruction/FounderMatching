import Image from "next/image";
import React from "react";
import profilePhoto from "@/assets/people.png";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import ExperienceBoard from "@/components/discover/ExperienceBoard";
import EducationBoard from "@/components/discover/EducationBoard";

const CandidatePage = () => {
  return (
    <>
      <div className="mt-4">
        <h1 className="text-xl font-semibold mb-4">Candidate</h1>
      </div>
      <div className="mb-5">
        <div className="grid grid-cols-10 gap-4 md:auto-rows-[16rem] mb-4">
          <div className="flex justify-center hover:shadow-xl col-span-2">
            <Image src={profilePhoto} alt="avatar" className="lg:size-full" />
          </div>
          <div className="bg-primaryBG col-span-2 flex flex-col items-center rounded-xl p-3">
            <p className="font-bold text-2xl">Cao Lam Huy</p>
            <p className="text-sm">Software Engineer</p>
            <div className="mt-3 flex flex-col items-center gap-2">
              <p className="font-bold">Contact</p>
              <p>0123456789</p>
              <GitHubLogoIcon />
              <p>HARDeconstruction</p>
              <LinkedInLogoIcon />
              <p>HARDeconstruction</p>
            </div>
          </div>
          <div className="col-span-5 bg-primaryBG flex flex-col justify-center gap-5 p-3 rounded-xl">
            <p className="font-semibold text-2xl">Biography</p>
            <ul className="list-disc list-inside">
              <li>
                Development of internal projects from scratch, product design of
                brands.
              </li>
              <li>Landing page, webapps and hybrid apps</li>
              <li>
                Taking decisions with stakeholders for the future of products
                such as Beagle labs, myur...
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 bg-primaryBG rounded-lg p-3">
            <p className="font-semibold text-2xl mb-5">Experience</p>
            <ExperienceBoard />
          </div>
          <div className="col-span-1 bg-primaryBG rounded-lg p-3">
            <p className="font-semibold text-2xl mb-5">Education / Skills</p>
            <EducationBoard />
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidatePage;
