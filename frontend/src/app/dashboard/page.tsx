"use client";
import React, { useState, useEffect } from "react";
import MetricCard from "@/components/layout/Dashboard/MetricCard";
import ProfileGraph from "@/components/layout/Dashboard/ProfileGraphCard";
import ProfileCard from "@/components/layout/Dashboard/ProfileCard";
import { useDashboardAPI } from "@/lib/api/dashboard";
import { DashboardData } from "@/lib/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const { getDashboardData } = useDashboardAPI();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const profileId = localStorage.getItem("currentProfileID") || "";
        if (!profileId) {
          throw new Error("Profile ID is required");
        }
        const response = await getDashboardData(profileId);
        setDashboardData(response);
        console.log("Dashboard data:", response);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading || !dashboardData) {
    return (
      <div className="grid grid-cols-4 gap-4 my-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="col-span-1">
            <Skeleton className="h-52 w-full" />
          </div>
        ))}

        <div className="col-span-4">
          <Skeleton className="h-80 w-full" />{" "}
        </div>

        {[...Array(4)].map((_, index) => (
          <div key={index} className="col-span-2">
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 my-8">
      <div className="col-span-1">
        <MetricCard
          title="Potential Matches"
          description="Premium Feature"
          value={dashboardData.reachedCount ?? "N/A"}
        />
      </div>
      <div className="col-span-1">
        <MetricCard
          title="Matched Profile"
          description="Total"
          value={dashboardData.matchedProfilesCount}
        />
      </div>
      <div className="col-span-1">
        <MetricCard
          title="Profile Views"
          description="Total"
          value={dashboardData.viewedCount}
        />
      </div>
      <div className="col-span-1">
        <MetricCard
          title="Connect Requests"
          description="Total"
          value={dashboardData.connectRequestCount}
        />
      </div>
      <div className="col-span-4">
        <ProfileGraph data={dashboardData.viewedHistory} />
      </div>

      {dashboardData.sampleProfiles.map((profile) => (
        <div key={profile.profileID} className="col-span-2">
          <ProfileCard profile={profile} />
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
