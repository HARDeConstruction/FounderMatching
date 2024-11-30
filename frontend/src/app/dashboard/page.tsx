"use client";
import React, { useState } from "react";
import MetricCard from "@/components/layout/MetricCard";
import ProfileGraph from "@/components/layout/ProfileGraphCard";
import ProfileCard from "@/components/layout/ProfileCard";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Redirect unauthenticated users
  if (!isSignedIn) {
    router.push("/login");
    return null; // Render nothing while redirecting
  }

  return (
    <div className="grid grid-cols-4 gap-4 my-8">
      <div className="col-span-1">
        <MetricCard
          title="Potential Startup Matches"
          description="This Month"
          value={13}
        />
      </div>
      <div className="col-span-1">
        <MetricCard
          title="Matched Startups"
          description="This Month"
          value={9}
        />
      </div>
      <div className="col-span-1">
        <MetricCard
          title="Search Appearance"
          description="This Month"
          value={329}
        />
      </div>
      <div className="col-span-1">
        <MetricCard
          title="Connect Requests"
          description="This Month"
          value={8}
        />
      </div>
      <div className="col-span-4">
        <ProfileGraph />
      </div>
      <div className="col-span-2">
        <ProfileCard
          name="Hamish Marsh"
          jobTitle="HR Manager"
          education="VinUni"
          imageUrl="/assets/images/hamish.png"
          userBio="To be or not to be"
        />
      </div>
      <div className="col-span-2">
        <ProfileCard
          name="Tony Stark"
          jobTitle="HR Specialist"
          education="FTU"
          imageUrl="/assets/images/mitchel.png"
          userBio="To love or not to love"
        />
      </div>
      <div className="col-span-2">
        <ProfileCard
          name="Elon Musk"
          jobTitle="Software Engineer"
          education="HUST"
          imageUrl="/assets/images/mitchel.png"
          userBio="HEHE"
        />
      </div>
      <div className="col-span-2">
        <ProfileCard
          name="Donald Trump"
          jobTitle="CEO"
          education="???"
          imageUrl="/assets/images/mitchel.png"
          userBio="qwerty uiop asdf ghjkl zxcv bnm"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
