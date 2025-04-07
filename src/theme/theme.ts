// File: src/theme/theme.ts

import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  mode: "light",
  background: "#f9fafb",
  inputBackground: "#ffffff",
  text: "#1f2937",
  textSecondary: "#6b7280",
  primary: "#6a11cb",
  primaryDark: "#5311a8",
  secondary: "#3b82f6",
};

export const darkTheme: DefaultTheme = {
  mode: "dark",
  background: "#111827",
  inputBackground: "#1f2937",
  text: "#f9fafb",
  textSecondary: "#9ca3af",
  primary: "#8b5cf6",
  primaryDark: "#7c3aed",
  secondary: "#60a5fa",
};
