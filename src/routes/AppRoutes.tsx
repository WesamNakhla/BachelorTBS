// src/routes/AppRoutes.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import NotFound from "../pages/NotFound/NotFound";

// Private pages
import Dashboard from "../pages/Dashboard/Dashboard";
import InvoiceList from "../pages/Invoices/InvoiceList";
import InventoryList from "../pages/Inventory/InventoryList";
import UserManagement from "../pages/Users/UserManagement";
import CreateUser from "../pages/Users/CreateUser";
import Reports from "../pages/Reports/Reports";
import Notifications from "../pages/Notifications/Notifications";
import Settings from "../pages/Settings/Settings";

// Security pages
import SecuritySettings from "../pages/Settings/Security/SecuritySettings";
import Enable2FA from "../pages/Settings/Security/Enable2FA";
import ActivityLogs from "../pages/Settings/Security/ActivityLogs";

// Protected Route
import ProtectedRoute from "../components/ui/ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />

      {/* Protected: Admin + Employee */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "employee"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      {/* Protected: Admin + Employee + Customer */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "employee", "customer"]} />}>
        <Route path="/invoices" element={<InvoiceList />} />
      </Route>

      {/* Protected: Admin only */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/security" element={<SecuritySettings />} />
        <Route path="/settings/security/enable-2fa" element={<Enable2FA />} />
        <Route path="/settings/security/logs" element={<ActivityLogs />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
