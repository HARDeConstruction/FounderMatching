"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProfileData } from "@/lib/types/profiles";
import StartupCardFront from "@/components/layout/Discover/StartupCardFront";
import StartupCardBack from "@/components/layout/Discover/StartupCardBack";
import { useDashboardAPI } from "@/lib/api/dashboard";

interface StartupCardProps {
  startup: ProfileData;
}

const StartupCard = ({ startup }: StartupCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { countView } = useDashboardAPI();
  console.log("startup data:", startup);

  const handleViewCount = async (toID: string) => {
    try {
      const profileId = localStorage.getItem("currentProfileID") || "";
      console.log("profileId", profileId);
      if (!profileId) {
        throw new Error("Profile ID is required");
      }
      const responseMessage = await countView(profileId, toID);
      console.log(`View count updated for profileID: ${toID}`);
    } catch (error: any) {
      console.error("Failed to update view count:", error);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    handleViewCount(startup.profileID.toString());
  };

  return (
    <motion.div
      className="relative w-full cursor-pointer"
      // onClick={handleFlip}
      style={{
        perspective: 1000,
      }}
    >
      {/* Card Wrapper with fixed height and overflow-hidden */}
      <div className="relative w-full h-[420px] overflow-hidden">
        {/* Front Side */}
        <motion.div
          className="absolute w-full h-full"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <StartupCardFront startup={startup} onFlip={handleFlip} />
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute w-full h-full"
          initial={{ rotateY: -180 }}
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.8 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <StartupCardBack startup={startup} onFlip={handleFlip} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StartupCard;
