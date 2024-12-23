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
        //const profilesData: ProfilePreviewCard[] = await response.json();
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

  if (loading)
    return <div className="text-center p-6">Loading profiles...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profiles</h1>
      <div className="flex flex-col items-center p-4">
        <Button onClick={() => router.push("/my-profile/create")}>
          Create New Profile
        </Button>
      </div>
      {profiles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card
              key={profile.profileID}
              className="cursor-pointer hover:shadow-md transition-all"
              onClick={() =>
                router.push(
                  `/dashboard/profile/me?profileId=${profile.profileID}`
                )
              }
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
      )}
    </div>
  );
};

export default MyProfilePage;
