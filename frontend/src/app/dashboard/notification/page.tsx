"use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import NotificationList from "@/components/layout/NotificationList";
// import NotificationFilter from "@/components/layout/NotificationFilter";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

const NotificationsPage = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const [filter, setFilter] = useState<"all" | "unread">("all");
  // const initialPage = parseInt(searchParams.get("page") || "1", 10);
  // const [currentPage, setCurrentPage] = useState(initialPage);
  // const itemsPerPage = 5;

  // const notifications = [
  //   {
  //     id: 1,
  //     avatarUrl: "/images/avatar1.png",
  //     message: "Hamish Marsh viewed your profile",
  //     actionText: "See Their Profile",
  //     isUnread: true,
  //   },
  //   {
  //     id: 2,
  //     avatarUrl: "/images/avatar2.png",
  //     message: "Gramophone is hiring Product Designer",
  //     actionText: "Apply Now",
  //     isUnread: false,
  //   },
  //   {
  //     id: 3,
  //     avatarUrl: "/images/avatar3.png",
  //     message: "Anna Lee liked your post",
  //     actionText: "View Post",
  //     isUnread: true,
  //   },
  //   {
  //     id: 4,
  //     avatarUrl: "/images/avatar4.png",
  //     message: "XYZ Corp is looking for a UI/UX Designer",
  //     actionText: "See Job",
  //     isUnread: true,
  //   },
  //   {
  //     id: 5,
  //     avatarUrl: "/images/avatar5.png",
  //     message: "Your profile was viewed 5 times this week",
  //     actionText: "See Insights",
  //     isUnread: false,
  //   },
  //   {
  //     id: 6,
  //     avatarUrl: "/images/avatar6.png",
  //     message: "You have a new connection request",
  //     actionText: "View Request",
  //     isUnread: true,
  //   },
  //   {
  //     id: 7,
  //     avatarUrl: "/images/avatar7.png",
  //     message: "Digital Corp is hiring Software Engineers",
  //     actionText: "Apply Now",
  //     isUnread: false,
  //   },
  //   {
  //     id: 8,
  //     avatarUrl: "/images/avatar8.png",
  //     message: "Maria Sanchez endorsed your skills",
  //     actionText: "View Endorsement",
  //     isUnread: true,
  //   },
  //   {
  //     id: 9,
  //     avatarUrl: "/images/avatar9.png",
  //     message: "New course available: React Development",
  //     actionText: "Enroll Now",
  //     isUnread: false,
  //   },
  //   {
  //     id: 10,
  //     avatarUrl: "/images/avatar10.png",
  //     message: "John Doe commented on your post",
  //     actionText: "See Comment",
  //     isUnread: true,
  //   },
  //   {
  //     id: 11,
  //     avatarUrl: "/images/avatar11.png",
  //     message: "Your subscription has been renewed",
  //     actionText: "View Details",
  //     isUnread: false,
  //   },
  //   {
  //     id: 12,
  //     avatarUrl: "/images/avatar12.png",
  //     message: "Acme Inc is hiring Data Analysts",
  //     actionText: "Apply Now",
  //     isUnread: true,
  //   },
  //   {
  //     id: 13,
  //     avatarUrl: "/images/avatar13.png",
  //     message: "Emily Clark sent you a message",
  //     actionText: "Read Message",
  //     isUnread: false,
  //   },
  //   {
  //     id: 14,
  //     avatarUrl: "/images/avatar14.png",
  //     message: "Your account security report is ready",
  //     actionText: "View Report",
  //     isUnread: true,
  //   },
  //   {
  //     id: 15,
  //     avatarUrl: "/images/avatar15.png",
  //     message: "Liam Nelson viewed your profile",
  //     actionText: "See Their Profile",
  //     isUnread: false,
  //   },
  //   {
  //     id: 16,
  //     avatarUrl: "/images/avatar16.png",
  //     message: "Sara Kim liked your post",
  //     actionText: "View Post",
  //     isUnread: true,
  //   },
  //   {
  //     id: 17,
  //     avatarUrl: "/images/avatar17.png",
  //     message: "Startup Hub is hiring Marketing Specialists",
  //     actionText: "Apply Now",
  //     isUnread: false,
  //   },
  //   {
  //     id: 18,
  //     avatarUrl: "/images/avatar18.png",
  //     message: "Mike Wong invited you to join his network",
  //     actionText: "Accept Invite",
  //     isUnread: true,
  //   },
  // ];

  // const filteredNotifications =
  //   filter === "all" ? notifications : notifications.filter((n) => n.isUnread);
  // const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  // const paginatedNotifications = filteredNotifications.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //     const newUrl = `${pathname}?page=${page}`;
  //     router.replace(newUrl);
  //   }
  // };

  // useEffect(() => {
  //   const page = parseInt(searchParams.get("page") || "1", 10);
  //   if (page !== currentPage) {
  //     setCurrentPage(page);
  //   }
  // }, [searchParams, currentPage]);

  return (
    <>
      <div className="flex-1 mt-4">
        <h1 className="text-xl font-semibold mb-4">Notifications</h1>
        <p className="text-gray-600 text-sm">
          This feature is under development
        </p>
        {/* <NotificationFilter currentFilter={filter} onFilterChange={setFilter} />
        <NotificationList
          notifications={paginatedNotifications}
          onActionClick={(id) =>
            console.log(`Action clicked for notification ${id}`)
          }
        /> */}
      </div>

      {/* <div className="flex justify-center p-4 border-t bg-white">
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

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

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
      </div> */}
    </>
  );
};

export default NotificationsPage;
