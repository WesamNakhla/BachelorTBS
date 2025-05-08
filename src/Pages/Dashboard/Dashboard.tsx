import dollar from "../../assets/Button.png";
import button1 from "../../assets/button1.png";
import { useTheme } from "../../context/theme";
const Dashboard = ()=>{
    const { isDark } = useTheme();
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col col-span-2 border-1 rounded-md border-[#A2A1A8]/20 p-3">
                    <div className="flex items-center">
                        <img src={dollar} alt="dollar" />
                        <p className={isDark ? "font-lexend text-[#fff] text-base ml-3" : "font-lexend text-[#16151C] text-base ml-3"}>total invioceses sent</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h4 className={isDark ? "text-[#fff] font-semibold text-3xl mt-5" : "text-[#16151C] font-semibold text-3xl mt-5"}>6 = 25.000</h4>
                        <img src={button1} alt="up" className="flex w-[54px] h-[26px]" />
                    </div>
                </div>
                <div className="flex flex-col border-1 rounded-md border-[#A2A1A8]/20 p-3">
                    <h4 className={ isDark ? "text-[#fff] font-semibold text-3xl mt-5" : "text-[#16151C] font-semibold text-3xl mt-5" }>Notification</h4>
                </div>
                <div className="flex flex-col border-1 rounded-md border-[#A2A1A8]/20 p-3">
                    <div className="flex items-center">
                        <img src={dollar} alt="dollar" />
                        <p className={ isDark ? "font-lexend text-[#fff] text-base ml-3" : "font-lexend text-[#16151C] text-base ml-3" }>Invioces sendt</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h4 className={ isDark ? "text-[#fff] font-semibold text-3xl mt-5" : "text-[#16151C] font-semibold text-3xl mt-5" }>6</h4>
                       
                    </div>
                </div>
                <div className="flex flex-col border-1 rounded-md border-[#A2A1A8]/20 p-3">
                    <div className="flex items-center">
                        <img src={dollar} alt="dollar" />
                        <p className={ isDark ? "font-lexend text-[#fff] text-base ml-3" : "font-lexend text-[#16151C] text-base ml-3" }>Pending Invioces</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h4 className={ isDark ? "text-[#fff] font-semibold text-3xl mt-5" : "text-[#16151C] font-semibold text-3xl mt-5" }>2</h4>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;