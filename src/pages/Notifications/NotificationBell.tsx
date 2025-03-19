import { useEffect, useState } from "react";
import { BellIcon, NotificationBadge } from "../styles/NotificationStyles";
import React from "react";
import styled from "styled-components";
import axios from "axios";

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch unread notification count
    axios.get("/api/notifications/unread-count").then((response) => {
      setUnreadCount(response.data.count);
    });
  }, []);

  return (
    <BellIcon>
      🔔
      {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
    </BellIcon>
  );
};

export default NotificationBell;
