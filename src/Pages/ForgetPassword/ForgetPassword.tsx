import { useState } from "react";
import FormInput from "../../Components/FormInput/FormInput";
import { toast } from "react-toastify";
import axiosInstances from "../../utils/api";
import { useNavigate } from "react-router-dom";

interface forgetPassword {
    email: string,
}
const Login = ()=>{
    const [ forgetPassword, setForgetPassword ]  = useState<forgetPassword>({
        email: ""
    });
    const [ loading, setLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setForgetPassword((prev)=>({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const data = {
                email: forgetPassword.email,
            }
            if(!data.email){
                toast.error("Enter your email");
                return false;
            }
            let response = await axiosInstances.post("/login", data);
            console.log(response);
            setLoading(false);
            toast.success("You are logged in successfully");
            navigate("/Dashboard");

        }catch(err: any){
            setLoading(false);
            console.log(err);
            toast.error(err.response?.data?.message || "An error occured");
        } 
    }
    return (
        <>
            <div className="flex flex-col h-[1000px]">
                <div className="flex items-center font-bold text-[#fff] w-[100%] h-[50px] p-10 text-lg bg-[#112147]">
                    <h3>TBS</h3>
                </div>
                <form className="flex flex-col  items-center h-full mt-20" onSubmit={handleSubmit}>
                    <div className="w-1/2">
                        <FormInput 
                            type="email"
                            label="Email" 
                            placeholder="Enter your email"
                            value={forgetPassword.email}
                            onChange={handleChange}
                            name="email"
                        />
                    </div>

                    <button type="submit" className="bg-[#66B2FF] cursor-pointer rounded-full text-[#fff] font-bold  w-[200px] h-[50px]">
                        { loading ? "Loading..." : "Send" }
                    </button>
                </form>
                <div className="w-[100%] h-[50px] bg-[#112147]">

                </div>
            </div>
        </>
    );
}
export default Login;