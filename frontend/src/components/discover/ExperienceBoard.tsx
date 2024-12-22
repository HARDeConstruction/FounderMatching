import React from "react";
import { Badge } from "../ui/badge";

const ExperienceBoard = () => {
  return (
    <div className="flex flex-col gap-3 overflow-y-scroll">
      <div className=" bg-green-400 rounded-lg text-white p-2">
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
      <div className="bg-white rounded-lg p-2">
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
