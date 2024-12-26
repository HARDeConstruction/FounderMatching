"use client";

import React, { useEffect, useState } from "react";
import { useProfileAPI } from "@/lib/api/profiles";
import { ProfileData } from "@/lib/types/profiles";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileDetailsByID from "@/components/profile/ProfileDetailsByID";
import { useDashboardAPI } from "@/lib/api/dashboard";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { getCurrentUserProfile } = useProfileAPI();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { countView } = useDashboardAPI();

  const handleViewCount = async (toID: string) => {
    try {
      const profileId = localStorage.getItem("currentProfileID") || "";
      console.log("profileId", profileId);
      await countView(profileId, toID);
      console.log(`View count updated for profileID: ${toID}`);
    } catch (err: any) {
      console.error("Failed to update view count:", err);
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
      } catch (err: any) {
        console.error("Error fetching profile data:", err);
        setError(
          err.response?.data?.message || "An error occurred while loading the profile."
        );
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-16 w-full mb-4" />
        <Skeleton className="h-8 w-1/4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <h1 className="text-xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="mt-4"
        >
          Go Back to Dashboard
        </Button>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <h1 className="text-xl font-bold text-gray-700 mb-4">
          Profile Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          The profile you're looking for does not exist or could not be loaded.
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="mt-4"
        >
          Go Back to Dashboard
        </Button>
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
