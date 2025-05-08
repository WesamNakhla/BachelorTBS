import { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Modal from "../../Components/Modal/Modal";
import FormInput from "../../Components/FormInput/FormInput";
import axiosInstance from "../../utils/api";

interface AllCustomer {
    _id: string,
    customer: string,
    type: string,
    contact_person: string,
    org_number: string,
    address: string,
    telephone: string
}
const Kunde = ()=>{
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isUpdating, setIsupdating ] = useState<boolean>(false);
    const [ isActive, setIsActive ] = useState<boolean>(false);
    const [ allCustomer, setAllCustomer ] = useState<AllCustomer[]>([]);
    const [ customersUpdate, setCustomersUpdate ] = useState<AllCustomer>({
        _id: "",
        customer: "",
        type: "",
        contact_person: "",
        org_number: "",
        address: "",
        telephone: ""
    })
    const [ customers, setCustomers ] = useState({
        customer: "",
        type: "",
        contact_person: "",
        org_number: "",
        address: "",
        telephone: ""
    })

    useEffect(()=>{
        const getAllCustomer = async()=>{
            try{
                let response = await axiosInstance.get("/all-customer");
                console.log(response);
                const customer_to_store = response.data.data.map((data: AllCustomer)=>{
                    return {
                        _id: data._id,
                        customer: data.customer,
                        type: data.type,
                        contact_person: data.contact_person,
                        org_number: data.org_number,
                        address: data.address,
                        telephone: data.telephone
                    }
                })
                setAllCustomer(customer_to_store);
    
            }catch(error: any){
                toast.error(error.message)
            }
        }
        getAllCustomer();
    }, [isActive])

    const handleCustomer = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        if(isUpdating){
            setCustomersUpdate(prev=>({
                ...prev,
                [name]: value
            }));
        }
        setCustomers(prev=>({
            ...prev,
            [name]: value
        }));
    }, [isUpdating]);
    const deleteCustomer = useCallback(async (id: string)=>{
        try{
            let response = await axiosInstance.delete(`/delete-customer/${id}`);
            toast.error(response.data?.message || "Customer deleted successfully");
            setIsActive(prev=> !prev);
        }catch(error: any){
            console.log(error);
            toast.error(error.response.data.message)
        }
    }, []);
    const submitCustomer = useCallback(async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        try{

            const data = isUpdating ? customersUpdate : customers;
            if(isUpdating){
                let response = await axiosInstance.put(`/update-customer/${customersUpdate._id}`, customersUpdate);
                console.log(response);
                toast.success(response.data?.message);
            }else{
                let response = await axiosInstance.post("/create-customer", data);
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
    }, [customers, customersUpdate, isUpdating])

    
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
                            <p className="text-xl font-semibold mr-2"><GoPlusCircle /></p>My Customer
                        </button>
                </div>
                <div className="flex mt-10">
                    <table className="table-fixed w-full text-center ">
                        <thead>
                            <th>Customer</th>
                            <th>Type</th>
                            <th>Contact Person</th>
                            <th>Org Num</th>
                            <th>Address</th>
                            <th>Telephone Num</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {
                                allCustomer.map(data=>(
                                    <tr className="border-1 border-[#A2A1A8]/10">
                                        <td className="py-4">{data.customer}</td>
                                        <td className="py-4">{data.type}</td>
                                        <td className="py-4">{data.contact_person}</td>
                                        <td className="py-4">{data.org_number}</td>
                                        <td className="py-4">{data.address}</td>
                                        <td className="py-4">{data.telephone}</td>
                                        <td className="flex py-4 text-lg cursor-pointer">
                                            <p><IoEyeOutline /></p>
                                            <p className="mx-4" onClick={()=>{
                                                setCustomersUpdate(data);
                                                setIsupdating(true);
                                                setShowModal(true);
                                            }}><LuPencilLine /></p>
                                            <p onClick={()=>deleteCustomer(data._id)}><RiDeleteBinLine /></p>
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
                        <form className="flex flex-col" onSubmit={submitCustomer}>
                            <h3 className="text-bold font-lexend text-base">New Customer</h3>
                            <div className="w-full h-[1px] bg-[#A2A1A8]/20 mt-5"></div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Customer Name"  
                                    placeholder="Name" 
                                    onChange={handleCustomer}
                                    value={isUpdating ? customersUpdate.customer : customers.customer}
                                    name="customer" />
                                <FormInput 
                                    type="text" 
                                    label="Type"  
                                    placeholder="Company" 
                                    onChange={handleCustomer}
                                    value={isUpdating ? customersUpdate.type : customers.type}
                                    name="type" />
                            </div>
                            <div className="flex ">
                                <FormInput
                                    type="text" 
                                    label="Contact Person"  
                                    placeholder="Contact Person" 
                                    onChange={handleCustomer}
                                    value={isUpdating ? customersUpdate.contact_person : customers.contact_person}
                                    name="contact_person" />
                                <FormInput 
                                    type="text" 
                                    label="Organisation Number"  
                                    placeholder="11223344" 
                                    onChange={handleCustomer}
                                    value={isUpdating ? customersUpdate.org_number : customers.org_number}
                                    name="org_number" />
                            </div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Address"  
                                    placeholder="Norway" 
                                    onChange={handleCustomer}
                                    value={isUpdating ? customersUpdate.address: customers.address}
                                    name="address" />
                                <FormInput 
                                    type="text" 
                                    label="Telephone"  
                                    placeholder="+1223344" 
                                    onChange={handleCustomer}
                                    value={isUpdating ? customersUpdate.telephone : customers.telephone}
                                    name="telephone" />
                            </div>
                            <div className="flex font-lexend">
                                <button type="button" onClick={()=> setShowModal(!showModal)} className="w-[170px] h-[50px] cursor-pointer border-1 border-[#A2A1A8]/20 rounded-md">
                                    Cancel
                                </button>
                                <button type="submit" className="w-[170px] h-[50px] cursor-pointer text-[#fff] bg-[#7152F3] border-1 border-[#A2A1A8]/20 rounded-md !ml-4">
                                   { isLoading ? "Loading" : " Add" }
                                </button>
                            </div>
                        </form>
                    </Modal>
            }
        </>
    );
}
export default Kunde;