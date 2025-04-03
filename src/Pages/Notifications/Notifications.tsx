import { useEffect, useState } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationList,
  NotificationItem,
  MarkAsReadButton,
} from "../../styles/NotificationStyles";

// Define the Notification Type
interface Notification {
  id: number;
  message: string;
}

// Notifications Component
const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch notifications from API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications");

        console.log("API Response:", response.data); // Debugging: Check what API returns

        // Validate if response data is an array
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          throw new Error("Invalid API response: Expected an array.");
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications. Please check API.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Function to mark a notification as read
  const markAsRead = async (id: number) => {
    try {
      await axios.post(`/api/notifications/mark-as-read/${id}`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
      setError("Failed to update notifications.");
    }
  };

  return (
    <NotificationContainer>
     

      {loading && <p>Loading notifications...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {notifications.length === 0 && !loading && !error ? (
        <p>No new notifications.</p>
      ) : (
        <NotificationList>
          {notifications.map((notification) => (
            <NotificationItem key={notification.id}>
              <p>{notification.message}</p>
              <MarkAsReadButton onClick={() => markAsRead(notification.id)}>
                Mark as Read
              </MarkAsReadButton>
            </NotificationItem>
          ))}
        </NotificationList>
      )}
    </NotificationContainer>
  );
};

export default Notifications;
