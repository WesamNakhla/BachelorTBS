import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import InvoiceList from "../pages/Invoices/InvoiceList";
import CustomerList from "../pages/Customers/CustomerList";
import UserManagement from "../pages/Users/UserManagement";
import RolePermissions from "../pages/Users/RolePermissions";
import SecuritySettings from "../pages/Security/SecuritySettings";
import Enable2FA from "../pages/Security/Enable2FA";
import ActivityLogs from "../pages/Security/ActivityLogs";
import Reports from "../pages/Reports/Reports";
import Notifications from "../pages/Notifications/Notifications";
import Settings from "../pages/Settings/Settings";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/invoices" element={<InvoiceList />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/users/roles" element={<RolePermissions />} />
      <Route path="/security" element={<SecuritySettings />} />
      <Route path="/security/enable-2fa" element={<Enable2FA />} />
      <Route path="/security/logs" element={<ActivityLogs />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
