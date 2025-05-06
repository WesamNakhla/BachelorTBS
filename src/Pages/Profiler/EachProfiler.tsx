import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
import FormInput from "../../Components/FormInput/FormInput";
import  axiosInstance  from "../../utils/api";

interface AllInventory {
    _id: string,
    arrival_date: string,
    sender: string,
    goods: string,
    quantity: string,
    weight: string,
    departure_date: string
}
const EachProfiler = ()=>{
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ kunde, setKunde ] = useState<string>("");
    const [ allInventory, setAllInventory ] = useState<AllInventory[]>([]);

    const handleKunde = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setKunde(e.target.value);
    }
    const param = useParams();
    useEffect(()=>{
        const getAllInventoryPerCustomer = async()=>{
            try{
                let response = await axiosInstance.get(`/getAllInventoryPerCustomer/${param.profile}`);
                let inventory_to_store = response.data.data.map((data: AllInventory)=>{
                    return{
                        _id: data._id,
                        arrival_date: data.arrival_date,
                        sender: data.sender,
                        goods: data.goods,
                        quantity: data.quantity,
                        weight: data.weight,
                        departure_date: data.departure_date
                    }
                })
                setAllInventory(inventory_to_store);
            }catch(error: any){
                console.log(error)
            }
        }
        getAllInventoryPerCustomer();
    }, []);
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
                    <table className="table-fixed w-full text-center ">
                        <thead>
                            <th>Arrival date</th>
                            <th>sender</th>
                            <th>Goods</th>
                            <th>Qty</th>
                            <th>Weight</th>
                            <th>Departure date</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {
                                allInventory.map(data=>(
                                    <tr className="border-1 border-[#A2A1A8]/10">
                                        <td className="py-4">{data.arrival_date}</td>
                                        <td className="py-4">{data.sender}</td>
                                        <td className="py-4">{data.goods}</td>
                                        <td className="py-4">{data.quantity}</td>
                                        <td className="py-4">{data.weight}</td>
                                        <td className="py-4">{data.departure_date}</td>
                                        <td className="flex py-4 text-lg cursor-pointer">
                                            <p><IoEyeOutline /></p>
                                            <p className="mx-4"><LuPencilLine /></p>
                                            <p><RiDeleteBinLine /></p>
                                        </td>
                                    </tr>
                                ))
                            }
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
export default EachProfiler;