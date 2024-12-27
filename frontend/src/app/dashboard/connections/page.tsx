"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ProfilePreviewCard } from "@/lib/types/profiles";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useConnectionsAPI } from "@/lib/api/connections";
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

  useEffect(() => {
    const fetchProfiles = async (
      filter: "connected" | "saved",
      page: number
    ) => {
      try {
        setLoading(true);
        const profileId = localStorage.getItem("currentProfileID") || "";

        if (!profileId) {
          throw new Error("Profile ID is required");
        }

        const response =
          filter === "connected"
            ? await getConnectedProfiles(profileId, page)
            : await getSavedProfiles(profileId, page);

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

    fetchProfiles(currentFilter, currentPage);
  }, [currentFilter, currentPage]);

  if (loading)
    return (
      <>
        <div className="p-8">
          <Skeleton className="h-8 w-1/4 mb-4" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-8 w-1/3 mb-4" />
        </div>
      </>
    );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <h1 className="text-xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="mt-4"
        >
          Go Back to Dashboard
        </Button>
      </div>
    );
  }

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
