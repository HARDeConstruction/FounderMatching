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
  const { getConnectedProfiles } = useConnectionsAPI();
  const [profiles, setProfiles] = useState<ProfilePreviewCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profileId =
          searchParams.get("profileID") ||
          localStorage.getItem("currentProfileID") ||
          "";

        if (!profileId) {
          throw new Error("Profile ID is required");
        }
        const response = await getConnectedProfiles(profileId, currentPage);
        console.log("Response from backend:", response);
        setProfiles(response.results);
        const totalPages = Math.ceil(response.total / response.perPage);
        setTotalPages(totalPages);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError("Failed to load profiles. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [searchParams]);

  // const handleProfileClick = (profileID: string) => {
  //   localStorage.setItem("currentProfileID", profileID);
  //   router.push(`/dashboard/profile/me?profileId=${profileID}`);
  // };

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

        {profiles.map((profile) => (
          <ProfileViewCard key={profile.profileID} profile={profile} />
        ))}
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
