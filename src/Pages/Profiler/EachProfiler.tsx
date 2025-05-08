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
    arrival_date: Date,
    sender: string,
    goods: string,
    quantity: string,
    weight: string,
    departure_date: Date
}
const EachProfiler = ()=>{
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isUpdating, setIsupdating ] = useState<boolean>(false);
    const [ isActive, setIsActive ] = useState<boolean>(false);
    const [ allInventory, setAllInventory ] = useState<AllInventory[]>([]);
    const [ inventoryUpdate, setInventoryUpdate ] = useState<AllInventory>({
        _id: "",
        arrival_date: new Date(),
        sender: "",
        goods: "",
        quantity: "",
        weight: "",
        departure_date: new Date()
    });
    const [ inventory, setInventory ] = useState({
        customer_name: "",
        arrival_date: new Date(),
        sender: "",
        goods: "",
        quantity: "",
        weight: "",
        departure_date: new Date()
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
    }, [isActive]);
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
            let response = await axiosInstance.delete(`/delete-inventory/${id}`);
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
            const inventory_data = {
                customer_name: param.profile,
                arrival_date: inventory.arrival_date,
                sender: inventory.sender,
                goods: inventory.goods,
                quantity: inventory.quantity,
                weight: inventory.weight,
                departure_date: inventory.departure_date
            }
            const data = isUpdating ? inventoryUpdate : inventory_data;
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
                            <p className="text-xl font-semibold mr-2"><GoPlusCircle /></p>My Inventory
                        </button>
                </div>
                <div className="flex mt-10">
                    <table className="table-fixed w-full text-center ">
                        <thead>
                            <tr>
                                <th>Arrival date</th>
                                <th>sender</th>
                                <th>Goods</th>
                                <th>Qty</th>
                                <th>Weight</th>
                                <th>Departure date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allInventory.map(data=>(
                                    <tr className="border-1 border-[#A2A1A8]/10">
                                        <td className="py-4">{new Date(data.arrival_date).toISOString().slice(0, 10)}</td>
                                        <td className="py-4">{data.sender}</td>
                                        <td className="py-4">{data.goods}</td>
                                        <td className="py-4">{data.quantity}</td>
                                        <td className="py-4">{data.weight}</td>
                                        <td className="py-4">{new Date(data.departure_date).toISOString().slice(0, 10)}</td>
                                        <td className="flex py-4 text-lg cursor-pointer">
                                            <p><IoEyeOutline /></p>
                                            <p className="mx-4" onClick={()=>{
                                                setInventoryUpdate(data);
                                                setIsupdating(true);
                                                setShowModal(true);
                                            }}><LuPencilLine /></p>
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
                        <form className="flex flex-col" onSubmit={submitInventory}>
                            <h3 className="text-bold font-lexend text-base">My Inventory</h3>
                            <div className="w-full h-[1px] bg-[#A2A1A8]/20 mt-5"></div>
                            <div className="flex ">
                                <FormInput 
                                    type="date" 
                                    label="Arrival Date"  
                                    placeholder="2002-12-33" 
                                    onChange={handleInventory}
                                    value={isUpdating ? new Date(inventoryUpdate.arrival_date).toISOString().slice(0, 10) : new Date(inventory.arrival_date).toISOString().slice(0, 10)}
                                    name="arrival_date" />
                               
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Sender"  
                                    placeholder="sender" 
                                    onChange={handleInventory}
                                    value={isUpdating ? inventoryUpdate.sender : inventory.sender}
                                    name="sender" />
                              
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Goods"  
                                    placeholder="Fish" 
                                    onChange={handleInventory}
                                    value={isUpdating ? inventoryUpdate.goods : inventory.goods}
                                    name="goods" />
                               
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Quantity"  
                                    placeholder="01" 
                                    onChange={handleInventory}
                                    value={isUpdating ? inventoryUpdate.quantity : inventory.quantity}
                                    name="quantity" />
                               
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Weight"  
                                    placeholder="23kg" 
                                    onChange={handleInventory}
                                    value={isUpdating ? inventoryUpdate.weight : inventory.weight}
                                    name="weight" />
                                <FormInput 
                                    type="date" 
                                    label="Departure Date"  
                                    placeholder="2003-12-45" 
                                    onChange={handleInventory}
                                    value={isUpdating ? new Date(inventoryUpdate.departure_date).toISOString().slice(0, 10) : new Date(inventory.departure_date).toISOString().slice(0, 10)}
                                    name="departure_date" />
                               
                            </div>
                            <div className="flex font-lexend">
                                <button type="button" onClick={()=> setShowModal(!showModal)} className="w-[170px] h-[50px] cursor-pointer border-1 border-[#A2A1A8]/20 rounded-md">
                                    cancel
                                </button>
                                <button type="submit" className="w-[170px] h-[50px] cursor-pointer text-[#fff] bg-[#7152F3] border-1 border-[#A2A1A8]/20 rounded-md !ml-4">
                                    { isLoading ? "Loading" : "Add" }
                                </button>
                            </div>
                        </form>
                    </Modal>
            }
        </>
    );
}
export default EachProfiler;