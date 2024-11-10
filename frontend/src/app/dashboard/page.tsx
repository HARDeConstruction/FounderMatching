"use client";
import React, { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import MetricCard from "@/components/layout/MetricCard";
import ProfileGraph from "@/components/layout/ProfileGraphCard";
import ProfileCard from "@/components/layout/ProfileCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DashboardPage = () => {
  return (
    <div className="flex-1 flex flex-col pr-4">
      {/* Header with Sidebar Toggle and Breadcrumb */}
      <div className="flex items-center p-4 border-b bg-white">
        {/* Breadcrumb */}
        <Breadcrumb className="flex-1">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

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
    </div>
  );
};

export default DashboardPage;
