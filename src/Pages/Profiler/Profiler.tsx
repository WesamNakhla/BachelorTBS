import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";

interface AllCustomer {
    _id: string,
    customer: string
}
const Profiler = ()=>{
    const [ allCustomer, setAllCustomer ] = useState<AllCustomer[]>([]);

    const navigate = useNavigate();
    useEffect(()=>{
        const getAllCustomerInventory = async()=>{
            try{
                let response = await axiosInstance.get("/getAllCustomerInventory");
                console.log(response);
                let customer_to_store = response.data.data.map((data: AllCustomer)=>{
                    return {
                        _id: data._id,
                        customer: data.customer.customer
                    }
                })
                setAllCustomer(customer_to_store);
            }catch(error: any){
                console.log(error);
            }
        }
        getAllCustomerInventory();
    }, [])

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
                </div>
                <div className="flex mt-10">
                    <table className="table-fixed w-full ">
                        <tbody>
                            {
                                allCustomer.map(data=>(
                                    <tr className="border-1 border-[#A2A1A8]/10">
                                        <td className="py-4 cursor-pointer" onClick={()=>navigate(`/Profiler/${data.customer}`, { replace: true })}>{data.customer}</td>
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
            
        </>
    );
}
export default Profiler;