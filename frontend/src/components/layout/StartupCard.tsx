"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProfileData } from "@/lib/types/profiles";
import StartupCardFront from "@/components/layout/StartupCardFront";
import StartupCardBack from "@/components/layout/StartupCardBack";

interface StartupCardProps {
  startup: ProfileData;
}

const StartupCard = ({ startup }: StartupCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  console.log("startup data:", startup);
  // Handle flip toggle
  const handleFlip = () => setIsFlipped(!isFlipped);

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
