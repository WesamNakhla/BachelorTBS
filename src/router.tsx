import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Om from "./Pages/Om/Om";
import Login from "./Pages/Login/Login";
import Contact from "./Pages/Contact/Contact";
import Register from "./Pages/Register/Register";
import Layout from "./Pages/Layout/Layout";
import NotFound from "./Pages/NotFound/NotFound";
// dashboard
import DashboardLayout from "./Pages/DashboardLayout/DashboardLayout";
import Faktura from "./Pages/Faktura/Faktura";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Kunde from "./Pages/Kunde/Kunde";
import Profiler from "./Pages/Profiler/Profiler";
import EachProfiler from "./Pages/Profiler/EachProfiler";
import Settings from "./Pages/Settings/Settings";
import UserManagement from "./Pages/Users/UserManagement";
import RolePermissions from "./Pages/Users/RolePermissions";
import SecuritySettings from "./Pages/Security/SecuritySettings";
import Enable2FA from "./Pages/Security/Enable2FA";
import ActivityLogs from "./Pages/Security/ActivityLogs";
import Reports from "./Pages/Reports/Reports";
import Notifications from "./Pages/Notifications/Notifications";


const Router = ()=>{
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Layout>
                        <Home />
                    </Layout>
                } />
                <Route path="*" element={
                    <Layout>
                        <NotFound />
                    </Layout>
                } />
                <Route path="/om" element={
                    <Layout>
                        <Om />
                    </Layout>
                } />
                <Route path="/login" element={
                    <Login />
                } />
                <Route path="/contact" element={
                    <Layout>
                        <Contact />
                    </Layout>
                } />
                <Route path="/register" element={
                        <Register />
                } />
                {/* dashboard route */}
                <Route path="/Faktura" element={
                    <DashboardLayout>
                        <Faktura />
                    </DashboardLayout>
                } />
                <Route path="/Faktura" element={
                    <DashboardLayout>
                        <Dashboard />
                    </DashboardLayout>
                } />
                 <Route path="/Kunder" element={
                    <DashboardLayout>
                        <Kunde />
                    </DashboardLayout>
                } />
                <Route path="/Profiler" element={
                    <DashboardLayout>
                        <Profiler />
                    </DashboardLayout>
                } />
                <Route path="/Settings" element={
                    <DashboardLayout>
                        <Settings />
                    </DashboardLayout>
                } />
                <Route path="/User" element={
                    <DashboardLayout>
                        <UserManagement />
                    </DashboardLayout>
                } />
                 <Route path="/Role" element={
                    <DashboardLayout>
                        <RolePermissions />
                    </DashboardLayout>
                } />
                 <Route path="/Security" element={
                    <DashboardLayout>
                        <SecuritySettings />
                    </DashboardLayout>
                } />
                 <Route path="/Enable-2fa" element={
                    <DashboardLayout>
                        <Enable2FA />
                    </DashboardLayout>
                } />
                <Route path="/Logs" element={
                    <DashboardLayout>
                        <ActivityLogs />
                    </DashboardLayout>
                } />
                <Route path="/Reports" element={
                    <DashboardLayout>
                        <Reports />
                    </DashboardLayout>
                } />
                <Route path="/Notifications" element={
                    <DashboardLayout>
                        <Notifications />
                    </DashboardLayout>
                } />
                <Route path="/Profiler/:profile" element={
                    <DashboardLayout>
                        <EachProfiler />
                    </DashboardLayout>
                } />
            </Routes>
        </>
    );
}
export default Router;