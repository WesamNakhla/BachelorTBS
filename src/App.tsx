import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

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
    </Router>
  );
};

export default App;
