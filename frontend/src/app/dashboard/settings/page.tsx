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

const SettingPage = () => {
  const { makeAuthenticatedRequest } = useAuthenticatedAxios();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserInfo>({
    FirstName: "",
    LastName: "",
    Email: "",
    LinkedInID: "",
    City: "",
    Slogan: "",
  });

  const POSTMAN_API_KEY = process.env.NEXT_PUBLIC_POSTMAN_API_KEY;

  // GET request
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await makeAuthenticatedRequest(
          `${POSTMAN_API_KEY}/api/user-profile`,
          "GET"
        );
        setUserInfo(data);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [makeAuthenticatedRequest]);

  // POST request
  const handleCreateProfile = async () => {
    try {
      const data = await makeAuthenticatedRequest(
        `${POSTMAN_API_KEY}/api/user-profile`,
        "POST",
        formData
      );
      setUserInfo(data);
      alert("Profile created successfully!");
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile");
    }
  };

  // PATCH request
  const handleUpdateProfile = async () => {
    try {
      const data = await makeAuthenticatedRequest(
        `${POSTMAN_API_KEY}/api/user-profile`,
        "PATCH",
        formData
      );
      setUserInfo(data);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
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
      <div className="flex flex-col items-center">
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                userInfo ? handleUpdateProfile() : handleCreateProfile();
                console.log("Form Data Submitted:", formData);
              }}
              className="space-y-4"
            >
              <Input
                type="text"
                placeholder="First Name"
                value={formData.FirstName}
                onChange={(e) =>
                  setFormData({ ...formData, FirstName: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={formData.LastName}
                onChange={(e) =>
                  setFormData({ ...formData, LastName: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.Email}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="LinkedIn ID"
                value={formData.LinkedInID}
                onChange={(e) =>
                  setFormData({ ...formData, LinkedInID: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="City"
                value={formData.City}
                onChange={(e) =>
                  setFormData({ ...formData, City: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Slogan"
                value={formData.Slogan}
                onChange={(e) =>
                  setFormData({ ...formData, Slogan: e.target.value })
                }
              />
              <DialogFooter>
                <Button type="submit">
                  {userInfo ? "Update Profile" : "Create Profile"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default SettingPage;
