"use client";

import React, { useEffect, useState } from "react";
import { useProfileAPI } from "@/lib/api/profiles";
import { ProfileData } from "@/lib/types/profiles";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { getCurrentUserProfile } = useProfileAPI();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const profileId = searchParams.get("profileId");
  const router = useRouter();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        // console.log("profileId", profileId);
        if (!profileId) {
          throw new Error("Profile ID is required");
        }
        const response = await getCurrentUserProfile(profileId);
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
    <div className="flex-1 mt-4">
      <div className="flex flex-row">
        <h1 className="text-xl font-semibold mb-4">
          {profileData.name}'s Profile
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
