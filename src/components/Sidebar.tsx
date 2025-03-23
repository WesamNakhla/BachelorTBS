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
} from "../styles/SidebarStyles";

import {
  Home,
  Users,
  FileText,
  Settings,
  Lock,
  Bell,
  Shield,
  FileSignature,
  Menu,
  X,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <Home /> },
    { to: "/invoices", label: "Fakturaer", icon: <FileText /> },
    { to: "/customers", label: "Kunder", icon: <Users /> },
    { to: "/users", label: "Users", icon: <Users /> },
    { to: "/users/roles", label: "Roles", icon: <Shield /> },
    { to: "/security", label: "Security Settings", icon: <Lock /> },
    { to: "/security/logs", label: "Activity Logs", icon: <FileSignature /> },
    { to: "/reports", label: "Reports", icon: <FileText /> },
    { to: "/notifications", label: "Notifications", icon: <Bell /> },
    { to: "/settings", label: "Settings", icon: <Settings /> },
  ];

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <HamburgerButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </HamburgerButton>

      {/* Sidebar for desktop */}
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
        </Nav>
      </SidebarContainer>

      {/* Sidebar for mobile */}
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
        </Nav>
      </MobileSidebar>

      {/* Background overlay for mobile */}
      {isSidebarOpen && <MobileOverlay onClick={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default Sidebar;
