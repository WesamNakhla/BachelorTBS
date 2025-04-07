// File: src/theme/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    background: string;
    inputBackground: string;
    text: string;
    textSecondary: string;
    primary: string;
    primaryDark: string;
    secondary: string;
  }
}
