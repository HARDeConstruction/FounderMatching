'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Profile } from "../types/profile";

const MyProfile: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Profile[]>("/api/getUserProfiles"); // Replace with actual API endpoint
        setProfiles(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load profiles.");
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (profileId: string) => {
    router.push(`/profile/me?id=${profileId}`);
  };

  if (loading) return <div className="p-4 text-center">Loading profiles...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profiles</h1>
      <div className="grid grid-cols-1 gap-4">
        {profiles.map((profile) => (
          <div
            key={profile.ProfileID}
            className="p-4 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleProfileClick(profile.ProfileID)}
          >
            <h2 className="font-bold">{profile.Name}</h2>
            <p>{profile.isStartup ? "Startup Profile" : "Candidate Profile"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
