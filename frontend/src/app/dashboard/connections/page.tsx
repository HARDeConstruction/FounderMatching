"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProfileAPI } from "@/lib/api/profiles";
import { ProfilePreviewCard } from "@/lib/types/profiles";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useConnectionsAPI } from "@/lib/api/connections";
import ProfileCard from "@/components/layout/ProfileCard";
import ProfileViewCard from "@/components/connections/ProfileViewCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ConnectionsPage = () => {
  const { getConnectedProfiles, getSavedProfiles } = useConnectionsAPI();
  const [profiles, setProfiles] = useState<ProfilePreviewCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentFilter, setCurrentFilter] = useState<"connected" | "saved">(
    "connected"
  );
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const profileId = localStorage.getItem("currentProfileID") || "";
      if (!profileId) {
        console.error("Profile ID is missing");
        return;
      }
      const newUrl = `${pathname}?profileID=${profileId}&page=${page}`;
      router.replace(newUrl);
    }
  };

  const handleFilterChange = (filter: "connected" | "saved") => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  const fetchProfiles = async (filter: "connected" | "saved", page: number) => {
    try {
      setLoading(true);
      const profileId =
        searchParams.get("profileID") ||
        localStorage.getItem("currentProfileID") ||
        "";

      if (!profileId) {
        throw new Error("Profile ID is required");
      }

      const response =
        filter === "connected"
          ? await getConnectedProfiles(profileId, page)
          : await getSavedProfiles(profileId, page); // Use appropriate API

      console.log(`Response from backend (${filter}):`, response);

      setProfiles(response.results);
      const totalPages = Math.ceil(response.total / response.perPage);
      setTotalPages(totalPages);
    } catch (err: any) {
      setError("Failed to load profiles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(currentFilter, currentPage);
  }, [currentFilter, currentPage]);

  if (loading)
    return (
      <>
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Loading profiles...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                {/* Avatar Skeleton */}
                <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                {/* Text Skeletons */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="flex-1 mt-4">
        <h1 className="text-xl font-semibold mb-4">Connections</h1>
        <div className="flex space-x-4 mb-4">
          <Button
            variant="outline"
            onClick={() => handleFilterChange("connected")}
            className={`px-4 py-2 ${
              currentFilter === "connected" ? "bg-blue-100 text-blue-500" : ""
            }`}
          >
            Connected
          </Button>
          <Button
            variant="outline"
            onClick={() => handleFilterChange("saved")}
            className={`px-4 py-2 ${
              currentFilter === "saved" ? "bg-blue-100 text-blue-500" : ""
            }`}
          >
            Saved
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileViewCard key={profile.profileID} profile={profile} />
            ))
          ) : (
            <p className="text-xl text-gray-500">
              No profiles found in {currentFilter} list.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center p-4 border-t bg-white">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default ConnectionsPage;
