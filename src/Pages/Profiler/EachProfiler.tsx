import { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isUpdating, setIsupdating ] = useState<boolean>(false);
    const [ isActive, setIsActive ] = useState<boolean>(false);
    const [ allInventory, setAllInventory ] = useState<AllInventory[]>([]);
    const [ inventoryUpdate, setInventoryUpdate ] = useState<AllInventory>({
        _id: "",
        arrival_date: "",
        sender: "",
        goods: "",
        quantity: "",
        weight: "",
        departure_date: ""
    });
    const [ inventory, setInventory ] = useState({
        arrival_date: "",
        sender: "",
        goods: "",
        quantity: "",
        weight: "",
        departure_date: ""
    });


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
    const handleInventory = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        if(isUpdating){
            setInventoryUpdate(prev=>({
                ...prev,
                [name]: value
            }));
        }
        setInventory(prev=>({
            ...prev,
            [name]: value
        }));
    }, [isUpdating]);
    const deleteInventory = useCallback(async (id: string)=>{
        try{
            let response = await axiosInstance.delete(`/delete-customer/${id}`);
            toast.error(response.data?.message || "Customer deleted successfully");
            setIsActive(prev=> !prev);
        }catch(error: any){
            console.log(error);
            toast.error(error.response.data.message)
        }
    }, []);
    const submitInventory = useCallback(async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        try{

            const data = isUpdating ? inventoryUpdate : inventory;
            if(isUpdating){
                let response = await axiosInstance.put(`/update-inventory/${inventoryUpdate._id}`, inventoryUpdate);
                console.log(response);
                toast.success(response.data?.message);
            }else{
                let response = await axiosInstance.post("/create-inventory", data);
                toast.success(response.data?.message);
            }
            // console.log(response);
            setIsLoading(false);
            setIsActive(prev=> !prev);
            setShowModal(!showModal);
            

        }catch(error: any){
            setIsLoading(false);
            setShowModal(!showModal);
            toast.error(error.response.data.message)
        }
    }, [inventory, inventoryUpdate, isUpdating])
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
                                            <p onClick={()=>deleteInventory(data._id)}><RiDeleteBinLine /></p>
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
                                    onChange={handleInventory}
                                    value={kunde} />
                               
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Kunde"  
                                    placeholder="Kunde" 
                                    onChange={handleInventory}
                                    value={kunde} />
                              
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Vare"  
                                    placeholder="Vare" 
                                    onChange={handleInventory}
                                    value={kunde} />
                               
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Vekt"  
                                    placeholder="Vekt" 
                                    onChange={handleInventory}
                                    value={kunde} />
                               
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Avgangsdato kunde"  
                                    placeholder="Avgangsdato kunde" 
                                    onChange={handleInventory}
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