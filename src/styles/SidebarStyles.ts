import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Container for the sidebar (desktop)
export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 24px 16px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  @media (max-width: 768px) {
    display: none;
  }
`;

// Mobile sidebar with slide-in effect
export const MobileSidebar = styled.div<{ $isOpen?: boolean }>`
  width: 240px;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 24px 16px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1100;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  @media (min-width: 769px) {
    display: none;
  }
`;

// Hamburger menu button (mobile)
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

// Overlay when sidebar is open on mobile
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
  color: #6a11cb;
  margin-bottom: 32px;
`;

// Navigation container
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

// Styled navigation link
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
    text-decoration: none;
  }
`;

// Icon wrapper
export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
