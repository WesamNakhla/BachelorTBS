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

  // ❌ Don't render sidebar at all for customers
  if (user?.role === "customer") return null;

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  // ✅ Define routes with role access
  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <Home />, roles: ["admin", "employee"] },
    { to: "/inventory", label: "Inventory", icon: <FileText />, roles: ["admin", "employee"] },
    { to: "/users", label: "Users", icon: <Users />, roles: ["admin"] },
    { to: "/settings/security/logs", label: "Activity Logs", icon: <FileSignature />, roles: ["admin"] },
    { to: "/reports", label: "Reports", icon: <FileText />, roles: ["admin", "employee"] },
    { to: "/notifications", label: "Notifications", icon: <Bell />, roles: ["admin", "employee"] },
    { to: "/settings", label: "Settings", icon: <Settings />, roles: ["admin"] },
  ];

  // ✅ Filter links by user role
  const visibleLinks = user
    ? navLinks.filter((link) => link.roles.includes(user.role))
    : [];

  return (
    <>
      {/* ✅ Hamburger for mobile */}
      <HamburgerButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </HamburgerButton>

      {/* ✅ Desktop Sidebar */}
      <SidebarContainer>
        <Logo>TBS</Logo>
        <Nav>
          {visibleLinks.map((link) => (
            <NavItem key={link.to} className={location.pathname === link.to ? "active" : ""}>
              <NavLinkStyled to={link.to}>
                <IconWrapper>{link.icon}</IconWrapper>
                {link.label}
              </NavLinkStyled>
            </NavItem>
          ))}
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

      {/* ✅ Mobile Sidebar */}
      <MobileSidebar $isOpen={isSidebarOpen}>
        <Logo>TBS</Logo>
        <Nav>
          {visibleLinks.map((link) => (
            <NavItem key={link.to} className={location.pathname === link.to ? "active" : ""}>
              <NavLinkStyled to={link.to} onClick={() => setIsSidebarOpen(false)}>
                <IconWrapper>{link.icon}</IconWrapper>
                {link.label}
              </NavLinkStyled>
            </NavItem>
          ))}
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
