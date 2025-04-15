// src/styles/SidebarStyles.ts

import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Sidebar container (desktop view)
export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 24px 16px 80px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`;

// Sidebar container (mobile view)
export const MobileSidebar = styled.div<{ $isOpen?: boolean }>`
  width: 240px;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 24px 16px 80px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1100;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 769px) {
    display: none;
  }
`;

// Hamburger toggle button (mobile only)
export const HamburgerButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1200;
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

// Background overlay for mobile sidebar
export const MobileOverlay = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
`;

// Logo (top of the sidebar)
export const Logo = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: #6a11cb;
  margin-bottom: 32px;
`;

// Navigation wrapper
export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Navigation item wrapper
export const NavItem = styled.div`
  &.active a {
    background-color: #ede9fe;
    color: #6a11cb;
    font-weight: 600;
  }
`;

// Styled NavLink
export const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #374151;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #6a11cb;
  }
`;

// Icon container next to text in nav links
export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// ===============================
// ✅ User info section at bottom
// ===============================

// Container for user info (bottom of sidebar)
export const UserInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

// Avatar (circular image)
export const UserAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

// Container for name and role
export const UserInfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// User name
export const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

// User role
export const UserRole = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
`;
export const AvatarCircle = styled.div`
  width: 38px;
  height: 38px;
  background-color: #6a11cb;
  color: #fff;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// ✅ Wrapper for name + role text next to avatar
export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;