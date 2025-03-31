import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from "../../Components/Modal/Modal";
import FormInput from "../../Components/FormInput/FormInput";
const Kunde = ()=>{
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ kunde, setKunde ] = useState<string>("");

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
                            <p className="text-xl font-semibold mr-2"><GoPlusCircle /></p>Ny Kunde
                        </button>
                </div>
                <div className="flex mt-10">
                    <table className="table-fixed w-full ">
                        <tbody>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Sjømat As</td>
                                <td className="py-4">Sjømat</td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Domstein Øst</td>
                                <td className="py-4">DS</td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Sjømathuset</td>
                                <td className="py-4">Sj</td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Domstein Kr.sand</td>
                                <td className="py-4">DS Kr.S</td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">FiskeCentralen</td>
                                <td className="py-4">FC</td>
                                <td className="flex py-4 text-lg cursor-pointer">
                                    <p><IoEyeOutline /></p>
                                    <p className="mx-4"><LuPencilLine /></p>
                                    <p><RiDeleteBinLine /></p>
                                </td>
                            </tr>
                            <tr className="border-1 border-[#A2A1A8]/10">
                                <td className="py-4">Asia Engros</td>
                                <td className="py-4">ASIA</td>
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
                            <h3 className="text-bold font-lexend text-base">Ny Kunde</h3>
                            <div className="w-full h-[1px] bg-[#A2A1A8]/20 mt-5"></div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Kunde"  
                                    placeholder="Kunde" 
                                    onChange={handleKunde}
                                    value={kunde} />
                                <FormInput 
                                    type="text" 
                                    label="Velge faktura mnde"  
                                    placeholder="Velge faktura mnde" 
                                    onChange={handleKunde}
                                    value={kunde} />
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="E-post"  
                                    placeholder="E-post" 
                                    onChange={handleKunde}
                                    value={kunde} />
                                <FormInput 
                                    type="text" 
                                    label="kontakt person"  
                                    placeholder="kontakt person" 
                                    onChange={handleKunde}
                                    value={kunde} />
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Org nr"  
                                    placeholder="Org nr" 
                                    onChange={handleKunde}
                                    value={kunde} />
                                <FormInput 
                                    type="text" 
                                    label="Adresse"  
                                    placeholder="Adresse" 
                                    onChange={handleKunde}
                                    value={kunde} />
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Postnr"  
                                    placeholder="Postnr" 
                                    onChange={handleKunde}
                                    value={kunde} />
                                <FormInput 
                                    type="text" 
                                    label="sted"  
                                    placeholder="sted" 
                                    onChange={handleKunde}
                                    value={kunde} />
                            </div>
                            <div className="flex font-lexend">
                                <button type="button" onClick={()=> setShowModal(!showModal)} className="w-[170px] h-[50px] cursor-pointer border-1 border-[#A2A1A8]/20 rounded-md">
                                    Cancel
                                </button>
                                <button type="button" onClick={()=> setShowModal(!showModal)} className="w-[170px] h-[50px] cursor-pointer text-[#fff] bg-[#7152F3] border-1 border-[#A2A1A8]/20 rounded-md !ml-4">
                                    Add
                                </button>
                            </div>
                        </div>
                    </Modal>
            }
        </>
    );
}
export default Kunde;