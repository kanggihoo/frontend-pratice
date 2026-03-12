import { useState } from "react";
import { useTheme } from "./ThemeContext.jsx";
import { notifications as initialNotifications } from "../data/mockData.js";

export default function NotificationList() {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={`${colors.bgCard} ${colors.border} border rounded-xl p-5 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-bold ${colors.text}`}>
          알림{" "}
          {unreadCount > 0 && (
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full ml-2">
              {unreadCount}
            </span>
          )}
        </h3>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors"
          >
            모두 읽음
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              notification.read
                ? `${colors.bg} opacity-60`
                : `${colors.bg} border-l-4 border-indigo-500`
            }`}
          >
            <span className="text-lg mt-0.5">
              {notification.read ? "📭" : "📬"}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${colors.text} ${notification.read ? "" : "font-semibold"}`}>
                {notification.message}
              </p>
              <p className={`text-xs mt-1 ${colors.textSecondary}`}>
                {notification.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
