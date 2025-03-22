import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  SidebarContainer,
  Logo,
  Nav,
  NavItem,
  NavLinkStyled,
  IconWrapper,
  HamburgerButton,
  MobileOverlay,
  MobileSidebar,
} from "../styles/SidebarStyles";

import NotificationBell from "./NotificationBell";

import {
  LayoutDashboard,
  FileText,
  UserRound,
  Users,
  FileSignature,
  Shield,
  Activity,
  FileBarChart,
  Bell,
  Settings,
  Menu,
  X,
} from "lucide-react";

// Navigation items with icons and paths
const menuItems = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "invoices", label: "Fakturaer", path: "/invoices", icon: <FileText size={18} /> },
  { id: "customers", label: "Kunder", path: "/customers", icon: <UserRound size={18} /> },
  { id: "users", label: "Users", path: "/users", icon: <Users size={18} /> },
  { id: "roles", label: "Roles", path: "/users/roles", icon: <FileSignature size={18} /> },
  { id: "security-settings", label: "Security Settings", path: "/security", icon: <Shield size={18} /> },
  { id: "activity-logs", label: "Activity Logs", path: "/security/logs", icon: <Activity size={18} /> },
  { id: "reports", label: "Reports", path: "/reports", icon: <FileBarChart size={18} /> },
  { id: "notifications", label: "Notifications", path: "/notifications", icon: <Bell size={18} /> },
  { id: "settings", label: "Settings", path: "/settings", icon: <Settings size={18} /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle for mobile

  // Toggle sidebar visibility
  const handleToggle = () => setIsOpen((prev) => !prev);

  // Close sidebar (for overlay or after clicking link)
  const handleClose = () => setIsOpen(false);

  // Render nav items, optionally pass close function for mobile
  const renderNavItems = (isMobile: boolean = false) =>
    menuItems.map((item) => (
      <NavItem
        key={item.id}
        className={location.pathname === item.path ? "active" : ""}
        onClick={isMobile ? handleClose : undefined}
      >
        <NavLinkStyled to={item.path}>
          <IconWrapper>{item.icon}</IconWrapper>
          {item.label}
        </NavLinkStyled>
      </NavItem>
    ));

  return (
    <>
      {/* Hamburger button (visible on mobile only) */}
      <HamburgerButton onClick={handleToggle}>
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </HamburgerButton>

      {/* Sidebar for desktop */}
      <SidebarContainer>
        <Logo>TBS</Logo>
        <Nav>{renderNavItems()}</Nav>
        <NotificationBell />
      </SidebarContainer>

      {/* Mobile overlay to close sidebar */}
      {isOpen && <MobileOverlay onClick={handleClose} />}

      {/* Sidebar for mobile (slide-in) */}
      <MobileSidebar isOpen={isOpen}>
        <Logo>TBS</Logo>
        <Nav>{renderNavItems(true)}</Nav>
      </MobileSidebar>
    </>
  );
};

export default Sidebar;
