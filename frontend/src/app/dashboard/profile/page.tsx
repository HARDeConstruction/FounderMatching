"use client";

import React, { useEffect, useState } from "react";
import { useProfileAPI } from "@/lib/api/profiles";
import { ProfileData } from "@/lib/types/profiles";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeInfoIcon,
  BriefcaseBusinessIcon,
  AwardIcon,
  MedalIcon,
  CircleIcon,
} from "lucide-react";

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
                <p className="text-sm text-gray-500">
                  You can update or edit your profile information.
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-gray-800">{profileData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{profileData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-semibold text-gray-800">
                {profileData.dateOfBirth}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-semibold text-gray-800">
                {profileData.gender.charAt(0).toUpperCase() +
                  profileData.gender.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-gray-800">
                {profileData.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-800">
                {profileData.city}, {profileData.country}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Website</p>
              <p className="font-semibold text-gray-800">
                {profileData.websiteLink ? (
                  profileData.websiteLink
                ) : (
                  <i className="text-gray-500">Not available</i>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">LinkedIn</p>
              <p className="font-semibold text-gray-800">
                {profileData.linkedInURL ? (
                  profileData.linkedInURL
                ) : (
                  <i className="text-gray-500">Not available</i>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Information */}

        <Card className="shadow-md my-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-6">
              <BadgeInfoIcon className="w-16 h-16" />
              <div>
                <CardTitle className="text-xl">Profile Highlights</CardTitle>
                <p className="text-base text-gray-500">
                  The Profile Highlights include a catchy Tagline, a detailed
                  Description, and Hobby Interests to showcase personality.
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col justify-between gap-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Slogan</span>
              <span className="text-base font-medium text-gray-800 italic">
                {profileData.slogan || (
                  <i className="text-gray-400">Not Available</i>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Hobby</span>
              <span className="text-base font-medium text-gray-800">
                {profileData.hobbyInterest || (
                  <i className="text-gray-400">Not Available</i>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Bio</span>
              <span className="text-base font-medium text-gray-800 leading-relaxed">
                {profileData.description || (
                  <i className="text-gray-400">Not Available</i>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Tags</span>
              <span className="text-base font-medium text-gray-800">
                {profileData.tags?.length > 0 ? (
                  profileData.tags.join(", ")
                ) : (
                  <i className="text-gray-400">Not Available</i>
                )}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Experiences */}
        <Card className="shadow-md my-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-6">
              <BriefcaseBusinessIcon className="w-16 h-16" />
              <div>
                <CardTitle className="text-xl">Experience</CardTitle>
                <p className="text-sm text-gray-500">
                  The Profile Highlights include a catchy Tagline, a detailed
                  Description, and Hobby Interests to showcase personality.
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            {profileData.experiences.length > 0 ? (
              profileData.experiences.map((exp: any, index: number) => (
                <div
                  key={index}
                  className="relative flex flex-col gap-1 p-4 mb-4"
                >
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center gap-6">
                      <CircleIcon className="w-[22px] h-[22px] z-10 -translate-y-2" />
                      <div
                        className="absolute top-[42px] left-6 translate-x-[2px] w-[2px] bg-gray-800"
                        style={{
                          height:
                            index === profileData.experiences.length - 1
                              ? "calc(100% - 30px)"
                              : "calc(100% + 15px)",
                        }}
                      ></div>

                      <div>
                        <h1 className="text-lg font-bold text-gray-800">
                          {exp.role}
                        </h1>
                        <h2 className="text-md font-semibold text-gray-700">
                          {exp.companyName} | {exp.location}
                        </h2>
                      </div>
                    </div>
                    <div className="text-md font-semibold text-gray-800">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <p className="text-gray-800 ml-12 mt-2">{exp.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-800 italic">No experiences added yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Certificates */}
        <Card className="shadow-md my-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-6">
              <AwardIcon className="w-16 h-16" />
              <div>
                <CardTitle className="text-xl">Certificates</CardTitle>
                <p className="text-sm text-gray-500">
                  Showcase your certifications, highlighting key skills,
                  achievements, and educational milestones.
                </p>
              </div>
            </div>
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
            <div className="flex items-center gap-6">
              <MedalIcon className="w-16 h-16" />
              <div>
                <CardTitle className="text-xl">Achievements</CardTitle>
                <p className="text-sm text-gray-500">
                  Highlight your notable accomplishments, showcasing milestones
                  and successes that set you apart.
                </p>
              </div>
            </div>
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
