// File: src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { LayoutWrapper, MainContent } from "./styles/AppStyles";
import { lightTheme, darkTheme } from "./theme/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useTheme } from "./context/ThemeContext"; // ✅ استخدام سياق الثيم

const App: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const { isDark } = useTheme(); // ✅ استبدال useState بـ useTheme

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <LayoutWrapper>
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <MainContent $isDesktop={isDesktop}>
            <AppRoutes />
          </MainContent>
        </LayoutWrapper>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
