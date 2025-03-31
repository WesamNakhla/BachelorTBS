import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiFileText } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa";


const navigation = [
    { "to": "/Dashboard", "text": "Dashboard", "icon": <RxDashboard /> },
    { "to": "/Faktura", "text": "Fakturaer" , "icon": <FiFileText /> },
    { "to": "/Kunder", "text": " Kunder", "icon": <FaUser />  },
    { "to": "/Profiler", "text": " Profiler", "icon": <FaUser />  },
    { "to": "/Settings", "text": "Settings", "icon": <IoSettingsOutline />},
    { "to": "/User", "text": "User", "icon": <FaUser />  },
    { "to": "/role", "text": "Role", "icon": <IoShieldCheckmarkSharp />  },
    { "to": "/Security", "text": "Security Settings", "icon": <FaLock />  },
    { "to": "/Logs", "text": "Activity Log", "icon": <FaFileSignature />  },
    { "to": "/Reports", "text": "Reports", "icon": <FiFileText />   },
    { "to": "/Notifications", "text": "Notifications", "icon": <IoMdNotificationsOutline />  },
    
    

]
const DashboardSidebar = ()=>{
    return(
        <>
            <div className="flex flex-col items-center w-[25%] h-full bg-[#A2A1A8]/5 p-5">
                <h1 className="font-lexend font-bold text-[#31A2F2]">TBS</h1>
                <div className="flex flex-col justify-between items-end min-h-[600px]">
                    <div className="flex flex-col justify-center items-start w-[200px]">
                        {
                            navigation.map(link=>(
                                <NavLink 
                                    to={link.to}
                                    className={({isActive}: NavLinkRenderProps)=>
                                    isActive ?
                                    "!bg-[#7152F3]/5 flex items-center w-full h-[50px] flex p-5 font-lexend font-semibold text-[#7152F3] text-base border-l-2 border-[#7152F3] mb-4" :
                                    "w-full h-[50px] flex items-center p-5 font-lexend font-light text-[#000] text-base mb-4"}>
                                    <p className="font-light text-base">{link.icon}</p>&nbsp;{link.text}
                                </NavLink>
                            ))
                        }
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