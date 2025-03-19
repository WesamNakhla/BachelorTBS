import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ToggleButton } from "../styles/SettingsStyles";

const ThemeToggle = () => {
  // Ensure that ThemeContext is not null before destructuring
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    console.error("ThemeToggle must be used within a ThemeProvider.");
    return null; // Prevents component from rendering if context is null
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <ToggleButton onClick={toggleTheme}>
      {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </ToggleButton>
  );
};

export default ThemeToggle;
