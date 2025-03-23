import { CiSearch } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
const Faktura = ()=>{
    return(
        <>
            <div className="flex flex-col border-1 border-[#A2A1A8]/20 mt-10 h-[500px] p-4">
                <div className="flex justify-between w-full">
                    
                        <form className="flex items-center w-[500px] h-[50px] border-1 border-[#A2A1A8]/10 rounded-md p-2">
                            <button type="submit" className="h-full">
                                <p className="text-lg"><CiSearch /></p>
                            </button>
                            <input className="h-full border-none outline-none" type="text" />
                        </form>
                    
                    
                        <button className="flex items-center justify-center font-semibold w-[150px] h-[50px] rounded-md bg-[#7152F3] text-[#fff]" type="button">
                            <p className="text-xl font-semibold mr-2"><GoPlusCircle /></p>Ny faktura
                        </button>
                </div>
                <div className="flex mt-10">
                    <table className="table-fixed w-full ">
                        <tbody>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Faktura 0001</td>
                                <td className="py-4">Faktura 00001</td>
                                <td className="py-4">Sjømat</td>
                                <td className="py-4">
                                    <p className="flex items-center justify-center bg-[#7152F3]/10 text-[#4DF410] rounded-md w-[70px] h-[30px] text-sm">
                                        Betalt
                                    </p>
                                </td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Faktura 0001</td>
                                <td className="py-4">Faktura 00001</td>
                                <td className="py-4">Sjømat</td>
                                <td className="py-4">
                                    <p className="flex items-center justify-center bg-[#7152F3]/10 text-[#4DF410] rounded-md w-[70px] h-[30px] text-sm">
                                        Betalt
                                    </p>
                                </td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Faktura 0001</td>
                                <td className="py-4">Faktura 00001</td>
                                <td className="py-4">Sjømat</td>
                                <td className="py-4">
                                    <p className="flex items-center justify-center bg-[#7152F3]/10 text-[#4DF410] rounded-md w-[70px] h-[30px] text-sm">
                                        Betalt
                                    </p>
                                </td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Faktura 0001</td>
                                <td className="py-4">Faktura 00001</td>
                                <td className="py-4">Sjømat</td>
                                <td className="py-4">
                                    <p className="flex items-center justify-center bg-[#7152F3]/10 text-[#4DF410] rounded-md w-[70px] h-[30px] text-sm">
                                        Betalt
                                    </p>
                                </td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Faktura 0001</td>
                                <td className="py-4">Faktura 00001</td>
                                <td className="py-4">Sjømat</td>
                                <td className="py-4">
                                    <p className="flex items-center justify-center bg-[#7152F3]/10 text-[#4DF410] rounded-md w-[70px] h-[30px] text-sm">
                                        Betalt
                                    </p>
                                </td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Faktura 0001</td>
                                <td className="py-4">Faktura 00001</td>
                                <td className="py-4">Sjømat</td>
                                <td className="py-4">
                                    <p className="flex items-center justify-center bg-[#7152F3]/10 text-[#4DF410] rounded-md w-[70px] h-[30px] text-sm">
                                        Betalt
                                    </p>
                                </td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default Faktura;