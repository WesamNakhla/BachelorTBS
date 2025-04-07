// File: src/styles/AppStyles.ts

import styled, { keyframes } from "styled-components";

// 🔄 Logo Rotation Animation
const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// ✅ Wrapper for the main app layout
export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

// ✅ Main content container that shifts with sidebar
export const MainContent = styled.div<{ $isDesktop: boolean }>`
  flex: 1;
  padding: 20px;
  margin-left: ${({ $isDesktop }) => ($isDesktop ? "250px" : "0px")};
  transition: margin-left 0.3s ease;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

// Optional demo container (if needed in root or intro pages)
export const RootWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

// Logo image styling
export const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  transition: filter 300ms;
  will-change: filter;

  &:hover {
    filter: drop-shadow(0 0 2em ${({ theme }) => theme.primary}aa);
  }

  &.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`;

// Card-style wrapper (optional use)
export const Card = styled.div`
  padding: 2em;
  background: ${({ theme }) => theme.inputBackground};
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
`;

// Footer / meta text
export const ReadTheDocs = styled.p`
  color: ${({ theme }) => theme.textSecondary};
`;

// Logo with animation
export const AnimatedLogo = styled(Logo)`
  animation: ${logoSpin} infinite 20s linear;
`;
