"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeInfoIcon,
  BriefcaseBusinessIcon,
  AwardIcon,
  MedalIcon,
  CircleChevronUpIcon,
  FileBadge2Icon,
  SparklesIcon,
} from "lucide-react";
import { ProfileData } from "@/lib/types/profiles";

type ProfileDetailsProps = {
  profileData: ProfileData;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profileData }) => {
  return (
    <>
      {/* Basic Information */}
      <div className="px-6 py-2">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={
                    typeof profileData.avatar === "string"
                      ? profileData.avatar
                      : undefined
                  }
                />
                <AvatarFallback>{profileData.name?.[0] || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </div>
            </div>
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

            {!profileData.isStartup ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-semibold text-gray-800">
                    {profileData.gender ? (
                      profileData.gender.charAt(0).toUpperCase() +
                      profileData.gender.slice(1)
                    ) : (
                      <i className="text-gray-500">Not available</i>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-500">Startup Stage</p>
                  <p className="font-semibold text-gray-800">
                    {profileData.currentStage.charAt(0).toUpperCase() +
                      profileData.currentStage.slice(1)}
                  </p>
                </div>
              </>
            )}

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
            <div>
              <p className="text-sm text-gray-500">Industry</p>
              <p className="font-semibold text-gray-800">
                {profileData.industry}
              </p>
            </div>
            {!profileData.isStartup ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="font-semibold text-gray-800">
                    {profileData.education}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-500">Is Startup</p>
                  <p className="font-semibold text-gray-800">
                    {profileData?.isStartup ? "Yes" : "No"}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Advanced Information */}
        <Card className="shadow-md my-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-6">
              <BadgeInfoIcon className="w-16 h-16" />
              <div>
                <CardTitle className="text-xl">Profile Highlights</CardTitle>
              </div>
            </div>
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
              <span className="text-sm text-gray-500">Bio</span>
              <span className="text-base font-medium text-gray-800 leading-relaxed">
                {profileData.description || (
                  <i className="text-gray-400">Not Available</i>
                )}
              </span>
            </div>

            {!profileData.isStartup ? (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Hobby</span>
                  <span className="text-base font-medium text-gray-800">
                    {profileData.hobbyInterest || (
                      <i className="text-gray-400">Not Available</i>
                    )}
                  </span>
                </div>{" "}
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Statement</span>
                  <span className="text-base font-medium text-gray-800">
                    {profileData.statement || (
                      <i className="text-gray-400">Not Available</i>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Our Story</span>
                  <span className="text-base font-medium text-gray-800">
                    {profileData?.aboutUs || (
                      <i className="text-gray-400">Not Available</i>
                    )}
                  </span>
                </div>
              </>
            )}

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

        {!profileData.isStartup ? (
          <>
            {/* Experiences */}
            <Card className="shadow-md my-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-6">
                  <BriefcaseBusinessIcon className="w-16 h-16" />
                  <div>
                    <CardTitle className="text-xl">Experience</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4">
                {(profileData.experiences ?? []).length > 0 ? (
                  (profileData.experiences ?? []).map(
                    (exp: any, index: number) => (
                      <div
                        key={index}
                        className="relative flex flex-col gap-1 p-4 mb-4"
                      >
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex items-center gap-6">
                            <CircleChevronUpIcon className="w-[22px] h-[22px] z-10 -translate-y-2" />
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
                        <p className="text-gray-800 ml-12 mt-2">
                          {exp.description}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-gray-800 italic">
                    No experiences added yet.
                  </p>
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
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4">
                {(profileData.certificates ?? []).length > 0 ? (
                  (profileData.certificates ?? []).map(
                    (cert: any, index: number) => (
                      <div
                        key={index}
                        className="relative flex flex-col gap-1 p-4 mb-4"
                      >
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex items-center gap-6">
                            <FileBadge2Icon className="w-[22px] h-[22px] z-10 -translate-y-2" />

                            <div>
                              <h1 className="text-lg font-bold text-gray-800">
                                {cert.name}
                              </h1>
                              <h2 className="text-md font-semibold text-gray-700">
                                Skill: {cert.skill} |{" "}
                                {cert.gpa ? `GPA: ${cert.gpa}` : ""}
                              </h2>
                            </div>
                          </div>
                          <div className="text-md font-semibold text-gray-800">
                            {cert.startDate} - {cert.endDate}
                          </div>
                        </div>
                        <p className="text-gray-800 ml-12 mt-2">
                          {cert.description}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-gray-800 italic">
                    No certificates added yet.
                  </p>
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
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4">
                {(profileData.achievements ?? []).length > 0 ? (
                  (profileData.achievements ?? []).map(
                    (ach: any, index: number) => (
                      <div
                        key={index}
                        className="relative flex flex-col gap-1 p-4 mb-4"
                      >
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex items-center gap-6">
                            <SparklesIcon className="w-[22px] h-[22px] z-10 " />
                            <div>
                              <h1 className="text-lg font-bold text-gray-800">
                                {ach.name}
                              </h1>
                            </div>
                          </div>
                          <div className="text-md font-semibold text-gray-800">
                            {ach.date}
                          </div>
                        </div>
                        <p className="text-gray-800 ml-12 mt-2">
                          {ach.description}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-gray-500 italic">
                    No achievements added yet.
                  </p>
                )}
              </CardContent>
            </Card>{" "}
          </>
        ) : (
          <>
            {/* Job Details */}
            <Card className="shadow-md my-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-6">
                  <BriefcaseBusinessIcon className="w-16 h-16" />
                  <div>
                    <CardTitle className="text-xl">Job Positions</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-6">
                {(profileData.jobPositions ?? []).length > 0 ? (
                  (profileData.jobPositions ?? []).map(
                    (job: any, index: number) => (
                      <div
                        key={index}
                        className="relative flex flex-col gap-4 p-4 border-2 rounded-lg shadow-sm"
                      >
                        <div className="flex flex-row justify-between items-center">
                          <div>
                            <h1 className="text-lg font-bold text-gray-800">
                              {job.jobTitle}
                            </h1>
                            <h2 className="text-md font-semibold text-gray-700">
                              {job.city && job.country
                                ? `${job.city}, ${job.country}`
                                : "Location not specified"}
                            </h2>
                          </div>
                          <p
                            className={`text-md font-semibold ${
                              job.isOpening ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {job.isOpening ? "Open for Applications" : "Closed"}
                          </p>
                        </div>

                        {job.startDate && (
                          <i className="text-sm text-gray-700">
                            Start Date: <strong>{job.startDate}</strong>
                          </i>
                        )}

                        <p className="text-gray-800 mt-1 ml-1">
                          {job.description}
                        </p>

                        {/* Tags */}
                        {job.tags && job.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {job.tags.map((tag: string, tagIndex: number) => (
                              <span
                                key={tagIndex}
                                className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  )
                ) : (
                  <p className="text-gray-800 italic">
                    No job positions added yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileDetails;
