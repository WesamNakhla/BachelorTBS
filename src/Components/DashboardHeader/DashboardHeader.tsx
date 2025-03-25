import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import user from "../../assets/user.png"

const DashboardHeader = ()=>{
    const location = useLocation();
    const [ pathName, setPathName ] = useState<string>("");

    useEffect(()=>{
        setPathName(location.pathname.slice(1));
    }, [location.pathname])

    return(
        <>
            <div className="flex justify-between w-full items-center">
                <p className="font-lexend font-semibold text-xl">{pathName}</p>
                <div className="flex justify-evenly">
                    <form className="flex items-center h-[50px] border-1 border-[#A2A1A8]/10 rounded-md p-2">
                        <button type="submit" className="h-full">
                            <p className="text-lg"><CiSearch /></p>
                        </button>
                        <input className="h-full border-none outline-none" type="text" />
                    </form>
                    <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#A2A1A8]/10 rounded-md mx-4">
                        <p className="text-xl"><IoNotificationsOutline /></p>
                    </div>
                    <div className="flex items-center justify-evenly border-1 border-[#A2A1A8]/10 w-[184px]">
                        <img src={user} alt="user" />
                        <p className="font-lexend font-semibold text-base ">Wesam</p>
                        <p className="text-lg cursor-pointer"><IoIosArrowDown /></p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DashboardHeader