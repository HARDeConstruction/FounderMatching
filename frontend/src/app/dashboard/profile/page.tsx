"use client";

import React, { useEffect, useState } from "react";
import { useProfileAPI } from "@/lib/api/profiles";
import { ProfileData } from "@/lib/types/profiles";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileDetailsByID from "@/components/profile/ProfileDetailsByID";
import { useDashboardAPI } from "@/lib/api/dashboard";

export default function ProfilePage() {
  const { getCurrentUserProfile } = useProfileAPI();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { countView } = useDashboardAPI();

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

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileId = searchParams.get("profileID");
        if (!profileId) {
          throw new Error("Profile ID is required");
        }
        console.log(profileId);
        const response = await getCurrentUserProfile(profileId);
        setProfileData(response);
        handleViewCount(profileId);
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
    <div className="flex-1 mt-4">
      <div className="flex flex-row">
        <h1 className="text-xl font-semibold mb-4">
          {profileData.name}'s Profile
        </h1>
      </div>
      <ProfileDetailsByID profileData={profileData} />
    </div>
  );
}
