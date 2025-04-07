import { FC } from "react";
import { Button } from "@/components/ui/button";

interface NotificationFilterProps {
  currentFilter: "all" | "unread";
  onFilterChange: (filter: "all" | "unread") => void;
}

const NotificationFilter: FC<NotificationFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Button
        variant="outline"
        onClick={() => onFilterChange("all")}
        className={`px-4 py-2 ${
          currentFilter === "all" ? "text-blue-500" : "text-zinc-500"
        }`}
      >
        All
      </Button>
      <Button
        variant="outline"
        onClick={() => onFilterChange("unread")}
        className={`px-4 py-2 ${
          currentFilter === "unread" ? "text-blue-500" : "text-zinc-500"
        }`}
      >
        Unread
      </Button>
    </div>
  );
};

export default NotificationFilter;
