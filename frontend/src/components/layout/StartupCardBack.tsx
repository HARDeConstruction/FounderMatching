"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StartupItem } from "@/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

interface StartupCardBackProps {
  startup: StartupItem;
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
        return startup.description;
      case "Our Team":
        return startup.team;
      case "Job Description":
        return startup.jobDescription;
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
