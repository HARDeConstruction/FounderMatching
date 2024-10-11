// src/app/components/layout/Sidebar.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Search,
  CircleUserRound,
  UsersRound,
  Settings,
  ChevronRight,
  LayoutDashboardIcon,
} from "lucide-react"; // Using Lucide icons

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } transition-all duration-300 bg-white shadow-md h-screen p-4 flex flex-col fixed top-0 left-0`}
    >
      {/* Toggle Button */}
      <Button
        onClick={toggleSidebar}
        variant="outline"
        size="icon"
        className="self-end mb-6"
      >
        <ChevronRight
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-zinc-600`}
        />
      </Button>

      {/* Logo Section */}
      {isOpen && (
        <div className="flex items-center mb-10">
          <Image
            src="/images/VinUni-Logo-PNG.png"
            alt="VinUni Logo"
            width={60}
            height={60}
          />
          <h2 className="ml-4 text-2xl font-bold text-zinc-900">
            Founder Matching
          </h2>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 mb-auto">
        <Link
          href="/dashboard"
          className="flex items-center p-2 rounded-md hover:bg-blue-100 group"
        >
          <LayoutDashboardIcon className="w-5 h-5 text-zinc-600 mr-2 group-hover:text-blue-600" />
          {isOpen && (
            <span className="text-zinc-900 group-hover:text-blue-600">
              Dashboard
            </span>
          )}
        </Link>
        <Link
          href="/discover"
          className="flex items-center p-2 rounded-md hover:bg-blue-100 group"
        >
          <Search className="w-5 h-5 text-zinc-600 mr-2 group-hover:text-blue-600" />
          {isOpen && (
            <span className="text-zinc-900 group-hover:text-blue-600">
              Discover
            </span>
          )}
        </Link>
        <Link
          href="/profiles/revisit"
          className="flex items-center p-2 rounded-md hover:bg-blue-100 group"
        >
          <UsersRound className="w-5 h-5 text-zinc-600 mr-2 group-hover:text-blue-600" />
          {isOpen && (
            <span className="text-zinc-900 group-hover:text-blue-600">
              Revisit Profiles
            </span>
          )}
        </Link>
        <Link
          href="/profile"
          className="flex items-center p-2 rounded-md hover:bg-blue-100 group"
        >
          <CircleUserRound className="w-5 h-5 text-zinc-600 mr-2 group-hover:text-blue-600" />
          {isOpen && (
            <span className="text-zinc-900 group-hover:text-blue-600">
              Profile
            </span>
          )}
        </Link>
        <Link
          href="/settings"
          className="flex items-center p-2 rounded-md hover:bg-blue-100 group"
        >
          <Settings className="w-5 h-5 text-zinc-600 mr-2 group-hover:text-blue-600" />
          {isOpen && (
            <span className="text-zinc-900 group-hover:text-blue-600">
              Settings
            </span>
          )}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
