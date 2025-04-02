import { FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card"; // Import Card components

interface NotificationItemProps {
  avatarUrl: string;
  message: string;
  actionText: string;
  isUnread: boolean;
  onClick: () => void;
}

const NotificationItem: FC<NotificationItemProps> = ({
  avatarUrl,
  message,
  actionText,
  isUnread,
  onClick,
}) => {
  return (
    <Card
      className={`mb-2 rounded-lg shadow-sm ${
        isUnread ? "bg-blue-50" : "bg-white"
      } `}
    >
      <CardContent className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatarUrl} alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-zinc-800">{message}</p>
            <a
              href="#"
              onClick={onClick}
              className="text-sm text-blue-500 hover:underline"
            >
              {actionText}
            </a>
          </div>
        </div>
        {isUnread && (
          <span className="w-2 h-2 bg-red-500 rounded-full ml-4" />
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationItem;
