import styled from "styled-components";

// Notification Container
export const NotificationContainer = styled.div`
  padding: 20px;
`;

// Notification List
export const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const NotificationItem = styled.li`
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Mark as Read Button
export const MarkAsReadButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

// Notification Bell Icon
export const BellIcon = styled.div`
  font-size: 24px;
  position: relative;
  cursor: pointer;
`;

export const NotificationBadge = styled.span`
  background: red;
  color: white;
  font-size: 14px;
  border-radius: 50%;
  padding: 5px;
  position: absolute;
  top: -5px;
  right: -5px;
`;
