// src/components/Sidebar.tsx
import React, { useState } from "react";
import {
  SidebarContainer,
  MobileSidebar,
  HamburgerButton,
  MobileOverlay,
  Logo,
  Nav,
  NavItem,
  NavLinkStyled,
  IconWrapper,
  UserInfoSection,
  UserName,
  UserRole,
  AvatarCircle,
  UserMeta,
} from "../styles/SidebarStyles";

import {
  Home,
  Users,
  FileText,
  Settings,
  Bell,
  FileSignature,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <Home /> },
    { to: "/invoices", label: "Fakturaer", icon: <FileText /> },
    { to: "/inventory", label: "Inventory", icon: <FileText /> },
    { to: "/users", label: "Users", icon: <Users /> },
    { to: "/settings/security/logs", label: "Activity Logs", icon: <FileSignature /> },
    { to: "/reports", label: "Reports", icon: <FileText /> },
    { to: "/notifications", label: "Notifications", icon: <Bell /> },
    { to: "/settings", label: "Settings", icon: <Settings /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <HamburgerButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </HamburgerButton>

      {/* Desktop sidebar */}
      <SidebarContainer>
        <Logo>TBS</Logo>
        <Nav>
          {navLinks.map((link) => (
            <NavItem key={link.to} className={location.pathname === link.to ? "active" : ""}>
              <NavLinkStyled to={link.to}>
                <IconWrapper>{link.icon}</IconWrapper>
                {link.label}
              </NavLinkStyled>
            </NavItem>
          ))}

          {/* Logout as a separate button */}
          <NavItem>
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#374151",
                width: "100%",
                fontSize: "1rem",
              }}
            >
              <IconWrapper><LogOut /></IconWrapper>
              Logout
            </button>
          </NavItem>
        </Nav>

        {/* User info (desktop) */}
        {user && (
          <UserInfoSection>
            <AvatarCircle>{user.name.charAt(0).toUpperCase()}</AvatarCircle>
            <UserMeta>
              <UserName>{user.name}</UserName>
              <UserRole>{user.role.toUpperCase()}</UserRole>
            </UserMeta>
          </UserInfoSection>
        )}
      </SidebarContainer>

      {/* Mobile sidebar */}
      <MobileSidebar $isOpen={isSidebarOpen}>
        <Logo>TBS</Logo>
        <Nav>
          {navLinks.map((link) => (
            <NavItem key={link.to} className={location.pathname === link.to ? "active" : ""}>
              <NavLinkStyled to={link.to} onClick={() => setIsSidebarOpen(false)}>
                <IconWrapper>{link.icon}</IconWrapper>
                {link.label}
              </NavLinkStyled>
            </NavItem>
          ))}

          {/* Logout for mobile */}
          <NavItem>
            <button
              onClick={() => {
                handleLogout();
                setIsSidebarOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#374151",
                width: "100%",
                fontSize: "1rem",
              }}
            >
              <IconWrapper><LogOut /></IconWrapper>
              Logout
            </button>
          </NavItem>
        </Nav>

        {/* User info (mobile) */}
        {user && (
          <UserInfoSection>
            <AvatarCircle>{user.name.charAt(0).toUpperCase()}</AvatarCircle>
            <UserMeta>
              <UserName>{user.name}</UserName>
              <UserRole>{user.role.toUpperCase()}</UserRole>
            </UserMeta>
          </UserInfoSection>
        )}
      </MobileSidebar>

      {isSidebarOpen && <MobileOverlay onClick={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default Sidebar;
