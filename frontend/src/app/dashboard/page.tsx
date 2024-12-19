"use client";
import React, { useState, useEffect } from "react";
import MetricCard from "@/components/layout/MetricCard";
import ProfileGraph from "@/components/layout/ProfileGraphCard";
import ProfileCard from "@/components/layout/ProfileCard";
import { useAuth } from "@clerk/nextjs";
import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";

const DashboardPage = () => {
  const { makeAuthenticatedRequest } = useAuthenticatedAxios();
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null); // Tracks authentication state

  useEffect(() => {
    console.log("DashboardPage mounted.");

    const validateToken = async () => {
      try {
        const data = await makeAuthenticatedRequest(
          "http://127.0.0.1:8000/api/protected-dashboard/",
          "POST",
          {},
          false
        );
        console.log("Token is valid. Backend Response:", data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, [makeAuthenticatedRequest]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Unauthorized. Please log in again.</div>;
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
