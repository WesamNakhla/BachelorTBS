import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Main Application Component
const App: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area - apply left margin only on desktop */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            marginLeft: isDesktop ? "250px" : "0px", // Adjust sidebar space for desktop only
            transition: "margin-left 0.3s ease", // Smooth transition when resizing
          }}
        >
          <AppRoutes />
        </div>
      </div>

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
  );
};

export default App;
