"use client";

import React, { useEffect, useState } from "react";
import { useProfileAPI } from "@/lib/api/profiles";
import { ProfileData } from "@/lib/types/profiles";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { getCurrentUserProfile } = useProfileAPI();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await getCurrentUserProfile();
        setProfileData(data);
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
      <h1 className="text-xl font-semibold mb-4">
        {profileData.name}'s Profile
      </h1>
      {/* Basic Information */}
      <div className="px-6 py-2">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={profileData.avatar || "/default-avatar.png"}
                />
                <AvatarFallback>{profileData.name?.[0] || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">Basic Information</CardTitle>
                <p className="text-base text-gray-500">
                  You can update or edit your profile information.
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong>Name:</strong> {profileData.name}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profileData.dateOfBirth}
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              {profileData.gender.charAt(0).toUpperCase() +
                profileData.gender.slice(1)}
            </p>
            <p>
              <strong>Phone:</strong> {profileData.phoneNumber}
            </p>
            <p>
              <strong>Location:</strong> {profileData.city},{" "}
              {profileData.country}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              {profileData.websiteLink ? (
                profileData.websiteLink
              ) : (
                <i>Not available</i>
              )}
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              {profileData.linkedInURL ? (
                profileData.linkedInURL
              ) : (
                <i>Not available</i>
              )}
            </p>
          </CardContent>
        </Card>

        {/* Advanced Information */}

        <Card className="shadow-md my-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className=" items-center gap-6">
              <CardTitle className="text-xl">Profile Highlights</CardTitle>
              <p className="text-base text-gray-500">
                The Profile Highlights include a catchy Tagline, a detailed
                Description, and Hobby Interests to showcase personality.
              </p>
            </div>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col justify-between gap-y-4">
            <p>
              <strong>Slogan:</strong>{" "}
              {profileData.slogan ? profileData.slogan : <i>Not Available</i>}
            </p>
            <p>
              <strong>Hobby:</strong>{" "}
              {profileData.hobbyInterest ? (
                profileData.hobbyInterest
              ) : (
                <i>Not Available</i>
              )}
            </p>
            <p>
              <strong>Bio:</strong>{" "}
              {profileData.description ? (
                profileData.description
              ) : (
                <i>Not Available</i>
              )}
            </p>
            <p>
              <strong>Tags:</strong>{" "}
              {profileData.tags ? (
                profileData.tags.join(", ")
              ) : (
                <i>Not Available</i>
              )}
            </p>
          </CardContent>
        </Card>

        {/* Experiences */}
        <Card className="shadow-md my-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Experiences</CardTitle>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            {profileData.experiences.length > 0 ? (
              profileData.experiences.map((exp: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 p-4 border rounded-lg mb-4 bg-gray-50"
                >
                  <h4 className="text-md font-bold text-gray-800">
                    {exp.role}
                  </h4>
                  <p className="text-sm text-gray-500">{exp.companyName}</p>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No experiences added yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Certificates */}
        <Card className="shadow-md my-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Certificates</CardTitle>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            {profileData.certificates.length > 0 ? (
              profileData.certificates.map((cert: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 p-4 border rounded-lg mb-4 bg-gray-50"
                >
                  <h4 className="text-md font-bold text-gray-800">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-600">Skill: {cert.skill}</p>
                  <p className="text-sm text-gray-600">
                    {cert.startDate} - {cert.endDate}
                  </p>
                  <p className="text-sm text-gray-700">
                    GPA: {cert.gpa || "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No certificates added yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="shadow-md my-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Achievements</CardTitle>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            {profileData.achievements.length > 0 ? (
              profileData.achievements.map((ach: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 p-4 border rounded-lg mb-4 bg-gray-50"
                >
                  <h4 className="text-md font-bold text-gray-800">
                    {ach.name}
                  </h4>
                  <p className="text-sm text-gray-600">Date: {ach.date}</p>
                  <p className="text-gray-700">{ach.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No achievements added yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}

const SectionCard = ({ title, children, onEdit }: SectionCardProps) => (
  <Card className="shadow-md my-6">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <Button size="sm" variant="outline" onClick={onEdit}>
        Edit
      </Button>
    </CardHeader>
    <CardContent className="flex flex-col gap-y-4">{children}</CardContent>
  </Card>
);
