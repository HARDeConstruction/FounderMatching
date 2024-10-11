'use client'
import React, { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import MetricCard from '@/components/layout/MetricCard';
// import ProfileGraph from '../components/dashboard/ProfileGraph';
// import ProfileViewerCard from '../components/dashboard/ProfileViewerCard';

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 p-6 bg-gray-100 pt-24 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} />
        <div className="grid grid-cols-2 gap-4 my-8">
          <MetricCard title="Potential Startup Matches" description="This Month" value={13} />
          <MetricCard title="Matched Startups" description="This Month"  value={9} />
          <MetricCard title="Search Appearance" description="This Month"  value={329} />
          <MetricCard title="Connect Requests" description="This Month" value={8} />
        </div>
        {/* <ProfileGraph />
        <div className="mt-8 grid grid-cols-3 gap-4">
          <ProfileViewerCard name="Hamish Marsh" jobTitle="HR Manager" profileImage="/assets/images/hamish.png" />
          <ProfileViewerCard name="Mitchel Starck" jobTitle="HR Specialist" profileImage="/assets/images/mitchel.png" />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
