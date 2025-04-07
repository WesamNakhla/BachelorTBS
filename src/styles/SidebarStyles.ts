// File: src/styles/SidebarStyles.ts

import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Sidebar (desktop)
export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 24px 16px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    display: none;
  }
`;

// Sidebar for mobile
export const MobileSidebar = styled.div<{ $isOpen?: boolean }>`
  width: 240px;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  position: fixed;
  top: 0;
  left: 0;
  padding: 24px 16px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1100;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, background-color 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  @media (min-width: 769px) {
    display: none;
  }
`;

// Mobile hamburger button
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

// Overlay for mobile
export const MobileOverlay = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
`;

// Logo styling
export const Logo = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 32px;
  transition: color 0.3s ease;
`;

// Navigation container
export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Nav item with active class
export const NavItem = styled.div`
  &.active a {
    background-color: ${({ theme }) => theme.primary}20; /* Light primary with transparency */
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
`;

// Navigation link styling
export const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  padding: 10px 12px;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary}15;
    color: ${({ theme }) => theme.primary};
  }
`;

// Icon wrapper
export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
