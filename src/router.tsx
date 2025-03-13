import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Om from "./Pages/Om/Om";
import Login from "./Pages/Login/Login";
import Contact from "./Pages/Contact/Contact";
import Layout from "./Pages/Layout/Layout";
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
            </Routes>
        </>
    );
}
export default Router;