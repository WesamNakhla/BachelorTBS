import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Om from "./Pages/Om/Om";
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
            </Routes>
        </>
    );
}
export default Router;