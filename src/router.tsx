import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Om from "./Pages/Om/Om";
import Login from "./Pages/Login/Login";
import Contact from "./Pages/Contact/Contact";
import Layout from "./Pages/Layout/Layout";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword"
// dashboard
import DashboardLayout from "./Pages/DashboardLayout/DashboardLayout";
import Faktura from "./Pages/Faktura/Faktura";
import Kunde from "./Pages/Kunde/Kunde";
import Profiler from "./Pages/Profiler/Profiler";
import EachProfiler from "./Pages/Profiler/EachProfiler";
import Dashboard from "./Pages/Dashboard/Dashboard";


const Router = ()=>{
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Layout>
                        <Home />
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
                <Route path="/forget-password" element={
                    
                        <ForgetPassword />
                    
                } />
                {/* dashboard route */}
                <Route path="/Faktura" element={
                    <DashboardLayout>
                        <Faktura />
                    </DashboardLayout>
                } />
                <Route path="/Dashboard" element={
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