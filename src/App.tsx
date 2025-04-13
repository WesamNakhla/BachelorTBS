// src/App.tsx

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom layout handler component
const LayoutWrapper: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const location = useLocation();

  // Update layout state on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define public routes where Sidebar should be hidden
  const isPublicRoute = ["/", "/auth/login"].includes(location.pathname);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Show Sidebar only in private routes */}
      {!isPublicRoute && <Sidebar />}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginLeft: !isPublicRoute && isDesktop ? "250px" : "0px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <AppRoutes />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <LayoutWrapper />
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
  );
};

export default App;
