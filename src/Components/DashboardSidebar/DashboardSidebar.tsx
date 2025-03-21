import { NavLink, NavLinkRenderProps } from "react-router-dom";

const DashboardSidebar = ()=>{
    return(
        <>
            <div className="flex flex-col items-center w-[25%] h-full bg-[#A2A1A8]/5">
                <h1 className="font-lexend font-bold text-[#31A2F2]">TBS</h1>
                <div className="flex">
                    <NavLink 
                        to="/dashboard"
                        className={({isActive}: NavLinkRenderProps)=> 
                        isActive ?
                         "bg-[#7152F3]/5 w-full flex p-5 font-lexend font-semibold text-[#7152F3] text-base border-l-2 border-[#7152F3] " :
                         "w-full flex p-5 font-lexend font-semibold text-[#7152F3] text-base"}>
                        Fakturaer
                    </NavLink>
                </div>
            </div>
        </>
    );
}
export default DashboardSidebar;