import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Main Application Component
const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: "20px" }}>
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
