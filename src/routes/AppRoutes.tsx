import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import InvoiceList from "../pages/Invoices/InvoiceList";
import CustomerList from "../pages/Customers/CustomerList";
import UserManagement from "../pages/Users/UserManagement";
import SecuritySettings from "../pages/Settings/Security/SecuritySettings";
import Enable2FA from "../pages/Settings/Security/Enable2FA";
import ActivityLogs from "../pages/Settings/Security/ActivityLogs";
import Reports from "../pages/Reports/Reports";
import Notifications from "../pages/Notifications/Notifications";
import Settings from "../pages/Settings/Settings";
import CreateUser from "../pages/Users/CreateUser";
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/invoices" element={<InvoiceList />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/settings/security" element={<SecuritySettings />} />
      <Route path="/settings/security/enable-2fa" element={<Enable2FA />} />
      <Route path="/settings/security/logs" element={<ActivityLogs />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/users/create" element={<CreateUser />} />
    </Routes>
  );
};

export default AppRoutes;
