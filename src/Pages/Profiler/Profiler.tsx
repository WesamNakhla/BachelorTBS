// import { useState, useEffect } from "react";
// import { CiSearch } from "react-icons/ci";
// import { IoEyeOutline } from "react-icons/io5";
// import { LuPencilLine } from "react-icons/lu";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/api"
// const Profiler = ()=>{
//     // const [  ]
//     const navigate = useNavigate();
//     useEffect( ()=>{
//         const getAllInvoice = async ()=>{
//             let response = await axiosInstance.get("/all-invoice");
//             const data_to_store = response.data?.data.map((data: AllInvoices)=>{
//                 return {
//                     invoiceNumber: data.invoiceNumber,
//                     customer: data.customer,
//                     amount: data.amount,
//                     status: data.status,
//                     date: data.date
//                 }
//             });
//             console.log(data_to_store);
//             setAllInvoices(data_to_store);
//         }
//         getAllInvoice();
//     }, [isActive])

//     return(
//         <>
//             <div className="flex flex-col border-1 border-[#A2A1A8]/20 mt-10 h-[500px] p-4 relative">
               
//                 <div className="flex justify-between w-full">
                    
//                         <form className="flex items-center w-[500px] h-[50px] border-1 border-[#A2A1A8]/10 rounded-md p-2">
//                             <button type="submit" className="h-full">
//                                 <p className="text-lg"><CiSearch /></p>
//                             </button>
//                             <input className="h-full border-none outline-none" type="text" />
//                         </form>
//                 </div>
//                 <div className="flex mt-10">
//                     <table className="table-fixed w-full ">
//                         <tbody>
//                             <tr className="border-1 border-[#A2A1A8]/10">
//                                 <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>sjømat as</td>
//                                 <td className="flex py-4 text-lg cursor-pointer">
//                                     <p><IoEyeOutline /></p>
//                                     <p className="mx-4"><LuPencilLine /></p>
//                                     <p><RiDeleteBinLine /></p>
//                                 </td>
//                             </tr>
//                             <tr className="border-1 border-[#A2A1A8]/10">
//                                 <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>Domstein øst</td>
//                                 <td className="flex py-4 text-lg cursor-pointer">
//                                     <p><IoEyeOutline /></p>
//                                     <p className="mx-4"><LuPencilLine /></p>
//                                     <p><RiDeleteBinLine /></p>
//                                 </td>
//                             </tr>
//                             <tr className="border-1 border-[#A2A1A8]/10">
//                                 <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>sjømathuset</td>
//                                 <td className="flex py-4 text-lg cursor-pointer">
//                                     <p><IoEyeOutline /></p>
//                                     <p className="mx-4"><LuPencilLine /></p>
//                                     <p><RiDeleteBinLine /></p>
//                                 </td>
//                             </tr>
//                             <tr className="border-1 border-[#A2A1A8]/10">
//                                 <td className="py-4" onClick={()=>navigate("/Profiler/ab")}>Domstein kr.sand</td>
//                                 <td className="flex py-4 text-lg cursor-pointer">
//                                     <p><IoEyeOutline /></p>
//                                     <p className="mx-4"><LuPencilLine /></p>
//                                     <p><RiDeleteBinLine /></p>
//                                 </td>
//                             </tr>
//                             <tr className="border-1 border-[#A2A1A8]/10">
//                                 <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>Fiskcentralen</td>
                                
//                                 <td className="flex py-4 text-lg cursor-pointer">
//                                     <p><IoEyeOutline /></p>
//                                     <p className="mx-4"><LuPencilLine /></p>
//                                     <p><RiDeleteBinLine /></p>
//                                 </td>
//                             </tr>
//                             <tr className="border-1 border-[#A2A1A8]/10">
//                                 <td className="py-4 cursor-pointer" onClick={()=>navigate("/Profiler/ab", { replace: true })}>Asia engros</td>
                               
//                                 <td className="flex py-4 text-lg cursor-pointer">
//                                     <p><IoEyeOutline /></p>
//                                     <p className="mx-4"><LuPencilLine /></p>
//                                     <p><RiDeleteBinLine /></p>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
            
//         </>
//     );
// }
// export default Profiler;