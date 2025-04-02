import { FC } from "react";
import NotificationItem from "./NotificationItem";

interface Notification {
  id: number;
  avatarUrl: string;
  message: string;
  actionText: string;
  isUnread: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onActionClick: (id: number) => void;
}

const NotificationList: FC<NotificationListProps> = ({
  notifications,
  onActionClick,
}) => {
  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          avatarUrl={notification.avatarUrl}
          message={notification.message}
          actionText={notification.actionText}
          isUnread={notification.isUnread}
          onClick={() => onActionClick(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationList;
