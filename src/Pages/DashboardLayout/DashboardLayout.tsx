import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import { useTheme } from "../../context/theme";

const DashboardLayout = ({children}: any)=>{
    const { isDark }  = useTheme();
    return (
        <>
            <div className={isDark ? "flex w-full h-full text-[#fff] bg-[#000]": "flex w-full h-full"}>
                <DashboardSidebar />
                <div className="p-5 w-[75%]">
                    <DashboardHeader />
                    {children}
                </div>
                
                
            </div>
        </>
    );
}
export default DashboardLayout;