import { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Modal from "../../Components/Modal/Modal";
import FormInput from "../../Components/FormInput/FormInput";
import axiosInstance  from "../../utils/api";


// interface UpdateIn
interface AllInvoices{
    invoiceNumber: string,
    customer: string,
    amount: number,
    status: string,
    date: Date
}
interface Invoice{
    customer: string,
    amount: number,
    status: string,
    date: Date
}
const Faktura = ()=>{
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isActive, setIsActive ] = useState(false);
    const [ isUpdating, setIsupdating ] = useState(false);
    const [ dataToUpdate, setDataToUpdate ] = useState<AllInvoices>({
        invoiceNumber: "",
        customer: "",
        amount: 0,
        status: "",
        date: new Date()
    });
    const [ allInvoices, setAllInvoices ] = useState<AllInvoices[]>([]);
    const [ invoice, setInvoice ] = useState<Invoice>({
        customer: "",
        amount: 0,
        status: "",
        date: new Date()
    });

    //fetch all invoices
    useEffect( ()=>{
        const getAllInvoice = async ()=>{
            try{
                let response = await axiosInstance.get("/all-invoice");
                console.log(response);
                const data_to_store = response.data?.data.map((data: AllInvoices)=>{
                    return {
                        invoiceNumber: data.invoiceNumber,
                        customer: data.customer.customer,
                        amount: data.amount,
                        status: data.status,
                        date: data.date
                    }
                });
               
                setAllInvoices(data_to_store);
            }catch(error: any){
                toast.error(error.message)
            }
           
        }
        getAllInvoice();
    }, [isActive])
    //delete invoice
    const deleteInvoice = useCallback(async (invoiceId: string)=>{
        const data = { 
            invoiceNumber: invoiceId
        }
        let response = await axiosInstance.delete("/delete-invoice", { data: data });
        setIsActive(prev=> !prev);
        toast.success(response.data?.message || "Invoice deleted successfully");
    }, []) 
    //handle form input change
    const handleInvoice = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        if(isUpdating){
            setDataToUpdate(prev=>({
                ...prev,
                [name]: name === "amount" ? Number(value) : value
            }))
        }else{
            setInvoice(prev=>({
                ...prev,
                [name]: name === "amount" ? Number(value) : value
            }))
        }
        
    }, [isUpdating])
    const submitInvoice = useCallback(async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const data = isUpdating ? dataToUpdate : invoice
        if(isUpdating){
            let response = await axiosInstance.put("/update-invoice", dataToUpdate);
            toast.success(response.data?.message);
        }else{
            let response = await axiosInstance.post("/create-invoice", data);
            toast.success(response.data?.message);
        }
       
        // console.log(response);
        setIsLoading(false);
        setIsActive(prev=> !prev);
        setShowModal(false);
        setIsupdating(false)

        }catch(error){
            setIsLoading(false)
            console.log(error);
        }
    }, [invoice, dataToUpdate, isUpdating])
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
                            <p className="text-xl font-semibold mr-2"><GoPlusCircle /></p>New Invoice
                        </button>
                </div>
                <div className="flex mt-10">
                    <table className="table-fixed w-full text-center ">
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Invoice name</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                allInvoices.map(data=>(
                                    <>
                                        <tr className="border-1 border-[#A2A1A8]/10" key={data.invoiceNumber}>
                                            <td className="py-4">{data.invoiceNumber}</td>
                                            <td className="py-4">{data.customer}</td>
                                            <td className="py-4">{ data.amount }</td>
                                            <td className="py-4">
                                                <p className={
                                                    (data.status === "paid") ? "flex items-center justify-center bg-[#7152F3]/10 text-[#4DF410] rounded-md w-[70px] h-[30px] text-sm"
                                                    : (data.status === "expired") ? "flex items-center justify-center bg-[#7152F3]/10 text-[#FA1533] rounded-md w-[70px] h-[30px] text-sm"
                                                    : "flex items-center justify-center bg-[#7152F3]/10 text-[#FAA215] rounded-md w-[70px] h-[30px] text-sm"
                                                }>
                                                    {data.status}
                                                </p>
                                            </td>
                                            <td className="flex py-4 text-lg cursor-pointer">
                                                <p><IoEyeOutline /></p>
                                                <p className="mx-4" onClick={()=>{
                                                    setDataToUpdate(data);
                                                    setIsupdating(true);
                                                    setShowModal(true);
                                                }}><LuPencilLine /></p>
                                                <p onClick={()=>deleteInvoice(data.invoiceNumber)}><RiDeleteBinLine /></p>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                    showModal &&
                    <Modal>
                        <form className="flex flex-col" onSubmit={submitInvoice}>
                            <h3 className="text-bold font-lexend text-base">New Invoice</h3>
                            <div className="w-full h-[1px] bg-[#A2A1A8]/20 mt-5"></div>
                            <div className="flex ">
                                <FormInput 
                                    type="text" 
                                    label="Customer"  
                                    placeholder="Customer" 
                                    onChange={handleInvoice}
                                    value={isUpdating ? dataToUpdate.customer : invoice.customer}
                                    name="customer" />
                                <FormInput 
                                    type="text" 
                                    label="Amount"  
                                    placeholder="Enter amount" 
                                    onChange={handleInvoice}
                                    value={isUpdating ? dataToUpdate.amount : invoice.amount}
                                    name="amount" />
                            </div>
                            <div className="flex">
                                <FormInput 
                                    type="text" 
                                    label="Status"  
                                    placeholder="Paid" 
                                    onChange={handleInvoice}
                                    value={isUpdating ? dataToUpdate.status : invoice.status}
                                    name="status" />
                                <FormInput 
                                    type="date" 
                                    label="Date"  
                                    placeholder="2025-04-15" 
                                    onChange={handleInvoice}
                                    value={isUpdating ? new Date(dataToUpdate.date).toISOString().slice(0, 10) : new Date(invoice.date).toISOString().slice(0, 10)}
                                    name="date" />
                                
                            </div>
                            
                           
                            <div className="flex font-lexend">
                                <div onClick={()=> {
                                    setShowModal(!showModal);
                                    setIsupdating(!isUpdating);
                                }} className="flex items-center justify-center w-[170px] h-[50px] cursor-pointer border-1 border-[#A2A1A8]/20 rounded-md">
                                    Cancel
                                </div>
                                <button type="submit"  className="w-[170px] h-[50px] cursor-pointer text-[#fff] bg-[#7152F3] border-1 border-[#A2A1A8]/20 rounded-md !ml-4">
                                    { (isUpdating) ? "Update" : (isLoading) ? "Loading..." : "Add" }
                                </button>
                            </div>
                        </form>
                    </Modal>
            }
        </>
    );
}
export default Faktura;