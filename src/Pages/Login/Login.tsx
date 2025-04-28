import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import { toast } from "react-toastify";
import axiosInstances from "../../utils/api";
import { useNavigate } from "react-router-dom";

interface login {
    email: string,
    password: string
}
const Login = ()=>{
    const [ loginData, setLoginData ]  = useState<login>({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setLoginData((prev)=>({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const data = {
                email: loginData.email,
                password: loginData.password
            }
            if(!data.email || !data.password){
                toast.error("Enter your login credentials");
                return false;
            }
            let response = await axiosInstances.post("/login", data);
            console.log(response);
            toast.success("You are logged in successfully");
            navigate("/Dashboard");

        }catch(err: any){
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
                <form className="flex flex-col justify-center items-center h-full" onSubmit={handleSubmit}>
                    <div className="w-1/2">
                        <FormInput 
                            type="text" 
                            label="username *" 
                            placeholder="Enter your username"
                            value={loginData.email}
                            onChange={handleChange}
                            name="email"
                        />
                        <FormInput 
                            type="password" 
                            label="Password *" 
                            placeholder="*******"
                            value={loginData.password}
                            onChange={handleChange}
                            name="password"
                        />
                    </div>

                    <button type="submit" className="bg-[#66B2FF] cursor-pointer rounded-full text-[#fff] font-bold  w-[200px] h-[50px]">
                        Logg inn
                    </button>
                    <Link to="/" className="text-[#66B2FF] my-5">Jeg har glemt mitt passord</Link>
                   
                    <Link to="/register" className="flex justify-center items-center border border-[#66B2FF] cursor-pointer mt-10 rounded-full text-[#66B2FF] font-bold w-[200px] h-[50px]">
                        Opprett bruker
                    </Link>
                </form>
                <div className="w-[100%] h-[50px] bg-[#112147]">

                </div>
            </div>
        </>
    );
}
export default Login;