"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileData } from "@/lib/types/profiles";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusinessIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface StartupCardBackProps {
  startup: ProfileData;
  onFlip: () => void;
}

const tabs = ["About Us", "Our Solution", "Our Team", "Job Description"];

const StartupCardBack: React.FC<StartupCardBackProps> = ({
  startup,
  onFlip,
}) => {
  const [activeTab, setActiveTab] = useState("About Us");

  const renderContent = () => {
    switch (activeTab) {
      case "About Us":
        return startup.aboutUs;
      case "Our Solution":
        return startup.statement;
      case "Our Team":
        return "THIS IS PREMIUM FEATURE";
      case "Job Description":
        return (
          <>
            {(startup.jobPositions ?? []).length > 0 ? (
              (startup.jobPositions ?? []).map((job: any, index: number) => (
                <div
                  key={index}
                  className="relative flex flex-col gap-4 p-4 border-2 rounded-lg shadow-sm"
                >
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      <h1 className="text-lg font-bold text-gray-800">
                        {job.jobTitle}
                      </h1>
                      <h2 className="text-md font-semibold text-gray-700">
                        {job.city && job.country
                          ? `${job.city}, ${job.country}`
                          : "Location not specified"}
                      </h2>
                    </div>
                    <p
                      className={`text-md font-semibold ${
                        job.isOpening ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {job.isOpening ? "Open for Applications" : "Closed"}
                    </p>
                  </div>

                  {job.startDate && (
                    <i className="text-sm text-gray-700">
                      Start Date: <strong>{job.startDate}</strong>
                    </i>
                  )}

                  <p className="text-gray-800 mt-1 ml-1">{job.description}</p>

                  {/* Tags */}
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-800 italic">
                No job positions added yet.
              </p>
            )}
          </>
        );
      default:
        return startup.aboutUs;
    }
  };

  return (
    <Card className="shadow-lg p-2 h-full flex flex-col justify-between overflow-hidden">
      <CardHeader>
        <NavigationMenu className="flex flex-1 justify-around">
          <NavigationMenuList>
            {tabs.map((tab) => (
              <NavigationMenuItem key={tab}>
                <NavigationMenuLink asChild>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab ? "font-bold" : "text-muted-foreground"
                    } px-2`}
                  >
                    {tab}
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </CardHeader>

      <CardContent className="space-y-2 overflow-y-auto h-[80%] custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-zinc-800"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <Button variant="ghost" onClick={onFlip} className="mt-4 self-start">
        Back
      </Button>
    </Card>
  );
};

export default StartupCardBack;
