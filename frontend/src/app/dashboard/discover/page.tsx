"use client";

import StartupCard from "@/components/layout/Discover/StartupCard";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useConnectionsAPI } from "@/lib/api/connections";
import { ProfileData } from "@/lib/types/profiles";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

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
  const { getSuggestedProfiles, connectProfile, saveProfile } =
    useConnectionsAPI();

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

  const handleSave = async (toID: string) => {
    try {
      const profileId = localStorage.getItem("currentProfileID") || "";
      console.log("profileId", profileId);
      if (!profileId) {
        throw new Error("Profile ID is required");
      }
      const responseMessage = await saveProfile(profileId, toID);
      toast.success("Profile saved!");
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
        // console.log("profileId", profileId);
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

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="h-96 w-full m-4" />
      </div>
    );
  }

  if (!profileData || profileData.length === 0) {
    return (
      <>
        <div className="flex-1 mt-4">
          <h1 className="text-xl font-semibold mb-4">Discover</h1>
          <div className="grid place-items-center h-64">
            <h1 className="text-center text-2xl font-semibold mb-4">
              No new profiles found!
            </h1>
          </div>
        </div>
      </>
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
          <Button
            onClick={() => handleSave(profileData[index].profileID.toString())}
          >
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
