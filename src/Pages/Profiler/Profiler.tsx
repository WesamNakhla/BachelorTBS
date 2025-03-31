import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
import FormInput from "../../Components/FormInput/FormInput";
const Profiler = ()=>{
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ kunde, setKunde ] = useState<string>("");
    const navigate = useNavigate();

    const handleKunde = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setKunde(e.target.value);
    }
    return(
        <>
            <div className="flex flex-col border-1 border-[#A2A1A8]/20 mt-10 h-[500px] p-4 relative">
               
                <div className="flex justify-between w-full">
                    
                        <form className="flex items-center w-[500px] h-[50px] border-1 border-[#A2A1A8]/10 rounded-md p-2">
                            <button type="submit" className="h-full">
                                <p className="text-lg"><CiSearch /></p>
                            </button>
                            <input className="h-full border-none outline-none" type="text" />
                        </form>
                    
                    
                        <button className="flex items-center justify-center cursor-pointer font-semibold w-[150px] h-[50px] rounded-md bg-[#7152F3] text-[#fff]"
                         type="button"
                         onClick={()=>setShowModal(!showModal)}>
                            <p className="text-xl font-semibold mr-2"><GoPlusCircle /></p>legg til  verdier
                        </button>
                </div>
                <div className="flex mt-10">
                    <table className="table-fixed w-full ">
                        <tbody>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>sjømat as</td>
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
                                <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>Domstein øst</td>
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
                                <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>sjømathuset</td>
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
                                <td className="py-4" onClick={()=>navigate("/Profiler/ab")}>Domstein kr.sand</td>
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
                                <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>Fiskcentralen</td>
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
                                <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>Asia engros</td>
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
            {
                    showModal &&
                    <Modal>
                        <div className="flex flex-col">
                            <h3 className="text-bold font-lexend text-base">Verdier</h3>
                            <div className="w-full h-[1px] bg-[#A2A1A8]/20 mt-5"></div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Mottaksdato"  
                                    placeholder="Mottaksdato" 
                                    onChange={handleKunde}
                                    value={kunde} />
                               
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Kunde"  
                                    placeholder="Kunde" 
                                    onChange={handleKunde}
                                    value={kunde} />
                              
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Vare"  
                                    placeholder="Vare" 
                                    onChange={handleKunde}
                                    value={kunde} />
                               
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Vekt"  
                                    placeholder="Vekt" 
                                    onChange={handleKunde}
                                    value={kunde} />
                               
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Avgangsdato kunde"  
                                    placeholder="Avgangsdato kunde" 
                                    onChange={handleKunde}
                                    value={kunde} />
                               
                            </div>
                            <div className="flex font-lexend">
                                <button type="button" onClick={()=> setShowModal(!showModal)} className="w-[170px] h-[50px] cursor-pointer border-1 border-[#A2A1A8]/20 rounded-md">
                                    Avbryt
                                </button>
                                <button type="button" onClick={()=> setShowModal(!showModal)} className="w-[170px] h-[50px] cursor-pointer text-[#fff] bg-[#7152F3] border-1 border-[#A2A1A8]/20 rounded-md !ml-4">
                                    Lagre
                                </button>
                            </div>
                        </div>
                    </Modal>
            }
        </>
    );
}
export default Profiler;