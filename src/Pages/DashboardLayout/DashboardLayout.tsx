import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";

const DashboardLayout = ({children}: any)=>{
    return (
        <>
            <div className="flex w-full h-full">
                <DashboardSidebar />
                <div>
                    <DashboardHeader />
                    {children}
                </div>
                
                
            </div>
        </>
    );
}
export default DashboardLayout;