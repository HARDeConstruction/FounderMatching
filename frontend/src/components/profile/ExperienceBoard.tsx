import React from "react";
import { Badge } from "../ui/badge";

const ExperienceBoard = () => {
  return (
    <div className="flex flex-col w-1/2 pb-8 bg-primaryBG gap-3 rounded-lg px-3">
      <h1 className="my-2">Experiences</h1>
      <div className=" bg-green-400 rounded-lg text-white">
        <div className="flex flex-row justify-between">
          <h1>Jul-2023 - Nov 2023</h1>
        </div>
        <div className="flex flex-row">
          <div>
            <h1 className="text-xl font-semibold">Software Engineer Intern</h1>
            <h2 className="text-sm">NaviAI | Full-time</h2>
          </div>
          <div>
            <ul className="list-inside list-disc">
              <li>
                Research and brainstorm various design ideas for content and
                marketing.
              </li>
              <li>
                Review the work submitted by Junior Designers and sharing
                feedback...
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg">
        <div className="flex flex-row justify-between">
          <h1>Jul-2023 - Nov 2023</h1>
        </div>
        <div className="flex flex-row">
          <div>
            <h1 className="text-xl font-semibold">Graphic/Web designer</h1>
            <h2 className="text-sm">NaviAI | Full-time</h2>
          </div>
          <div>
            <ul className="list-inside list-disc">
              <li>
                Research and brainstorm various design ideas for content and
                marketing.
              </li>
              <li>
                Review the work submitted by Junior Designers and sharing
                feedback...
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceBoard;
