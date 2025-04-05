import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import axiosInstances from "../../utils/Api/api";
import { toast, ToastContainer } from "react-toastify"
interface login {
    email: string,
    password: string
}
const Login = ()=>{
    const [ loginData, setLoginData ]  = useState<login>({
        email: "",
        password: ""
    });

    const handleLogin = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const data = {
                email: loginData.email,
                password: loginData.password
            }
            let response = await axiosInstances.post("/login", data);
            toast.success("You are logged in successfully");
            window.location.href = "/Dashboard";

        }catch(err: any){
            toast.error(err.response?.data.message);
        } 
    }


    return (
        <>
            <div className="flex flex-col h-[1000px]">
                <div className="flex items-center font-bold text-[#fff] w-[100%] h-[50px] p-10 text-lg bg-[#112147]">
                    <h3>TBS</h3>
                </div>
                <div className="flex flex-col justify-center items-center h-full ">
                    <form className="w-1/2 flex flex-col" onSubmit={handleSubmit}>
                        <FormInput 
                            type="email" 
                            label="E-postadresse *" 
                            placeholder="Enter your email address"
                            value={loginData.email}
                            onChange={handleLogin}
                            name="email"
                        />
                        <FormInput 
                            type="password" 
                            label="Password *" 
                            placeholder="*******"
                            value={loginData.password}
                            onChange={handleLogin}
                            name="password"
                        />
                        <button type="submit" className="bg-[#66B2FF] cursor-pointer rounded-full text-[#fff] font-bold  w-[200px] h-[50px]">
                            Logg inn
                        </button>

                        <Link to="/" className="text-[#66B2FF] my-5">Jeg har glemt mitt passord</Link>
                        
                        <Link to="/register" className="flex justify-center items-center border border-[#66B2FF] cursor-pointer mt-10 rounded-full text-[#66B2FF] font-bold w-[200px] h-[50px]">
                            Opprett bruker
                        </Link>
                    </form>
                    
                </div>
                <div className="w-[100%] h-[50px] bg-[#112147]">

                </div>
            </div>
        </>
    );
}
export default Login;