// src/routes/AppRoutes.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword"; // ✅ Import added
import NotFound from "../pages/NotFound/NotFound";

// Private dashboard pages
import Dashboard from "../pages/Dashboard/Dashboard";
import InvoiceList from "../pages/Invoices/InvoiceList";
import CustomerList from "../pages/Customers/CustomerList";
import UserManagement from "../pages/Users/UserManagement";
import CreateUser from "../pages/Users/CreateUser";
import Reports from "../pages/Reports/Reports";
import Notifications from "../pages/Notifications/Notifications";
import Settings from "../pages/Settings/Settings";

// Security pages (optional for now)
import SecuritySettings from "../pages/Settings/Security/SecuritySettings";
import Enable2FA from "../pages/Settings/Security/Enable2FA";
import ActivityLogs from "../pages/Settings/Security/ActivityLogs";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} /> {/* ✅ Added */}
      
      {/* Private dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/invoices" element={<InvoiceList />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/users/create" element={<CreateUser />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />

      {/* Optional: Security pages */}
      <Route path="/settings/security" element={<SecuritySettings />} />
      <Route path="/settings/security/enable-2fa" element={<Enable2FA />} />
      <Route path="/settings/security/logs" element={<ActivityLogs />} />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
