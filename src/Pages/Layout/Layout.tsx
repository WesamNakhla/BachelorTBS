import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
const Layout = ({children}: any)=>{
    return(
        <>
           <div className="w-[100%] h-[100vh]">
                <Header />
                {children}
                <Footer />
           </div>
        </>
    );
}
export default Layout;