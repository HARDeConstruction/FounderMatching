"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileAPI } from "@/lib/api/profiles";
import { ProfilePreviewCard } from "@/lib/types/profiles";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const MyProfilePage = () => {
  const { getUserProfiles } = useProfileAPI();
  const [profiles, setProfiles] = useState<ProfilePreviewCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await getUserProfiles();
        // console.log("Response from backend:", response);
        if (response.length === 0) {
          setError("You have not created any profiles yet.");
        }

        setProfiles(response);
      } catch (err: any) {
        console.error("Error fetching profiles:", err.message);
        // Only set error if it's not a "no profiles" error
        if (err.response?.data?.error !== "No profiles found for this user") {
          setError("Failed to load profiles. Please try again later.");
        } else {
          // If no profiles, just set empty array
          setProfiles([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (profileID: string) => {
    localStorage.setItem("currentProfileID", profileID);
    router.push(`/dashboard/profile/me`);
  };

  if (loading)
    return (
      <>
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Loading profiles...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                {/* Avatar Skeleton */}
                <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                {/* Text Skeletons */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4 space-y-10">
        <p className="text-xl font-bold">{error}</p>
        {error && (
          <Button onClick={() => router.push("/my-profile/create")}>
            Create Profile
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profiles</h1>
      <div className="flex flex-col items-center p-4">
        <Button onClick={() => router.push("/my-profile/create")}>
          Create New Profile
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Card
            key={profile.profileID}
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleProfileClick(profile.profileID.toString())}
          >
            <CardHeader className="flex items-center justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={profile.avatar || undefined}
                  alt={profile.name}
                  className="rounded-full object-cover"
                />
                <AvatarFallback>
                  {profile.name
                    ? profile.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()
                    : "?"}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="text-lg font-bold break-words">
                {profile.name}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {profile.occupation || "No occupation listed"}
              </CardDescription>
              <div className="mt-2 text-sm font-medium text-blue-600">
                {profile.isStartup ? "Startup" : "Candidate"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyProfilePage;
