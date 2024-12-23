"use client";

import StartupCard from "@/components/layout/StartupCard";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useConnectionsAPI } from "@/lib/api/connections";
import { ProfileData } from "@/lib/types/profiles";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { ta } from "date-fns/locale";

const animationVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const DiscoverPage = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData[]>([]);
  const router = useRouter();

  const handleNext = () => {
    if (index < profileData.length - 1) {
      setDirection(1);
      setIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex((prev) => prev - 1);
    }
  };
  const { getSuggestedProfiles, connectProfile } = useConnectionsAPI();

  const handleConnect = async (toID: string) => {
    try {
      const profileId = localStorage.getItem("currentProfileID") || "";
      console.log("profileId", profileId);
      if (!profileId) {
        throw new Error("Profile ID is required");
      }
      const responseMessage = await connectProfile(profileId, toID);
      toast.success("Profile connection sent!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileId = localStorage.getItem("currentProfileID") || "";
        console.log("profileId", profileId);
        if (!profileId) {
          throw new Error("Profile ID is required");
        }
        const response = await getSuggestedProfiles(profileId);
        

        setProfileData(response);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, []);

  if (loading || !profileData) {
    return (
      <div className="p-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-16 w-full mb-4" />
        <Skeleton className="h-8 w-1/4" />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 mt-4">
        <h1 className="text-xl font-semibold mb-4">Discover</h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={animationVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="pl-4 pr-8 pt-2"
          >
            <StartupCard startup={profileData[index]} />
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-row justify-center items-center p-6 space-x-8">
          <Button variant="outline" onClick={handlePrev}>
            Previous
          </Button>
          <Button>
            {" "}
            <StarIcon />
          </Button>
          <Button
            onClick={() =>
              handleConnect(profileData[index].profileID.toString())
            }
          >
            Connect
          </Button>
          <Button variant="outline" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
