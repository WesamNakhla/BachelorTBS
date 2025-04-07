// File: src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";

import { ThemeProviderWrapper } from "./context/ThemeContext";
import { GlobalStyles } from "./styles/GlobalStyles"; // Import global styles for theme support

// Get the root element from index.html
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ThemeProviderWrapper>
        <GlobalStyles /> {/* Apply global styles (background, text color, etc.) */}
        <App />
      </ThemeProviderWrapper>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found! Please ensure <div id='root'> exists in index.html.");
}
