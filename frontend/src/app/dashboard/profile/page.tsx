"use client";

import { useState, useEffect } from "react";
import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserInfo {
  FirstName: string;
  LastName: string;
  Email: string;
  LinkedInID: string;
  City: string;
  Slogan: string;
}

const ProfilePage = () => {
  const { makeAuthenticatedRequest } = useAuthenticatedAxios();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Use the makeAuthenticatedRequest for the GET request
        const data = await makeAuthenticatedRequest(
          "https://c7a2bdfa-8205-4571-a158-29ed3b1fc264.mock.pstmn.io/api/user-profile",
          "GET"
        );

        // console.log(data);
        setUserInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [makeAuthenticatedRequest]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
      <div className="space-y-2">
        <p>
          <strong>First Name:</strong> {userInfo?.FirstName}
        </p>
        <p>
          <strong>Last Name:</strong> {userInfo?.LastName}
        </p>
        <p>
          <strong>Email:</strong> {userInfo?.Email}
        </p>
        <p>
          <strong>Linkedin:</strong> {userInfo?.LinkedInID}
        </p>
        <p>
          <strong>City:</strong> {userInfo?.City || "N/A"}
        </p>
        <p>
          <strong>Slogan:</strong> {userInfo?.Slogan || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
