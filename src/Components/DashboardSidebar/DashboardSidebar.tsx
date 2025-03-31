import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";

const navigation = [
    { "to": "/Dashboard", "text": "Dashboard"  },
    { "to": "/Faktura", "text": "Fakturaer"  },
    { "to": "/Kunder", "text": " Kunder"  },
    { "to": "/Profiler", "text": " Profiler"  },
    { "to": "/Settings", "text": "Settings"  },
    { "to": "/User", "text": "User"  },
    { "to": "/Security", "text": "Security Settings"  },
    { "to": "/logs", "text": "Activity Log"  },
    
    

]
const DashboardSidebar = ()=>{
    return(
        <>
            <div className="flex flex-col items-center w-[25%] h-full bg-[#A2A1A8]/5 p-5">
                <h1 className="font-lexend font-bold text-[#31A2F2]">TBS</h1>
                <div className="flex flex-col justify-between h-[600px]">
                    <div className="flex flex-col justify-center text-center">
                        {/* <p className="flex justify-center items-center font-lexend font-light text-base mb-4">
                            <p className="mr-2"><RxDashboard /></p>
                            Dashboard
                        </p> */}
                        {
                            navigation.map(link=>(
                                <NavLink 
                                    to={link.to}
                                    className={({isActive}: NavLinkRenderProps)=>
                                    isActive ?
                                    "!bg-[#7152F3]/5 flex justify-center items-center w-[220px] h-[50px] flex p-5 font-lexend font-semibold text-[#7152F3] text-base border-l-2 border-[#7152F3] mb-4" :
                                    "w-[220px] h-[50px] flex justify-center items-center flex p-5 font-lexend font-light text-[#000] text-base mb-4"}>
                                    {link.text}
                                </NavLink>
                            ))
                        }
                        {/* <NavLink 
                            to="/Faktura"
                            className={({isActive}: NavLinkRenderProps)=>
                            isActive ?
                            "!bg-[#7152F3]/5 flex justify-center items-center w-[220px] h-[50px] flex p-5 font-lexend font-semibold text-[#7152F3] text-base border-l-2 border-[#7152F3] mb-4" :
                            "w-[220px] h-[50px] flex justify-center items-center flex p-5 font-lexend font-light text-[#000] text-base mb-4"}>
                            Fakturaer
                        </NavLink>
                        <NavLink 
                            to="/Kunder"
                            className={({isActive}: NavLinkRenderProps)=> 
                            isActive ?
                            "!bg-[#7152F3]/5 flex justify-center items-center w-[220px] h-[50px] flex p-5 font-lexend font-semibold text-[#7152F3] text-base border-l-2 border-[#7152F3] mb-4 " :
                            "w-[220px] h-[50px] flex justify-center items-center flex p-5 font-lexend font-light text-[#000] text-base mb-4"}>
                            Kunder
                        </NavLink>
                        <NavLink 
                            to="/Profiler"
                            className={({isActive}: NavLinkRenderProps)=> 
                            isActive ?
                            "!bg-[#7152F3]/5 flex justify-center items-center w-[220px] h-[50px] flex p-5 font-lexend font-semibold text-[#7152F3] text-base border-l-2 border-[#7152F3] mb-5" :
                            "w-[220px] h-[50px] flex justify-center items-center flex p-5 font-lexend font-light text-[#000] text-base mb-5"}>
                            Profiler
                        </NavLink> */}
                        {/* <p className="flex justify-center items-center font-lexend font-light text-base">
                            <p className="mr-2"><IoSettingsOutline /></p>
                            Settings
                        </p> */}
                    </div>
                    <div className="flex justify-between">
                        <div className="flex justify-center items-center mr-2 w-[110px] h-[50px] bg-[#7152F3] rounded-md font-lexend font-light text-[#fff]">
                            <p className="mr-2 text-lg"><CiLight /></p>Light
                        </div>
                        <div className="flex justify-center items-center w-[110px] h-[50px] bg-[#fff] rounded-md font-lexend font-light text-[#000]">
                            <p className="mr-2 text-lg"><MdOutlineDarkMode /></p>Dark
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
export default DashboardSidebar;