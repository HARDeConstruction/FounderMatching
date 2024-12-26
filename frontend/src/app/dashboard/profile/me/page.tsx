"use client";

import React, { useEffect, useState } from "react";
import { useProfileAPI } from "@/lib/api/profiles";
import { ProfileData } from "@/lib/types/profiles";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { Button } from "@/components/ui/button";
import { get } from "http";

export default function ProfilePage() {
  const { getCurrentUserProfile } = useProfileAPI();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileId = localStorage.getItem("currentProfileID") || "";
        if (!profileId) {
          throw new Error("Profile ID is required");
        }
        console.log(profileId);
        const response = await getCurrentUserProfile(profileId);
        setProfileData(response);
      } catch (err: any) {
        console.error("Error fetching profile data:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load profile. Please try again later."
        );
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

  return (
    <div className="flex-1 mt-4">
      <div className="flex flex-row">
        <h1 className="text-xl font-semibold mb-4">
          {`${profileData.name}'s Profile`}
        </h1>
        <Button
          className="ml-auto"
          variant="outline"
          size="sm"
          onClick={() => {
            router.push("/my-profile");
          }}
        >
          Change Profile
        </Button>
      </div>
      <ProfileDetails profileData={profileData} />
    </div>
  );
}
