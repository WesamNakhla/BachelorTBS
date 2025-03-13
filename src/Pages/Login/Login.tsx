import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
const Login = ()=>{
    const [ email, setEmail ]  = useState<string>("");
    const [ password, setPassword ]  = useState<string>("");
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const target_value = e.currentTarget as HTMLInputElement;
        setEmail(target_value.value);
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const target_value = e.currentTarget as HTMLInputElement;
        setPassword(target_value.value);
    }
    return (
        <>
            <div className="flex flex-col h-[1000px]">
                <div className="flex items-center font-bold text-[#fff] w-[100%] h-[50px] p-10 text-lg bg-[#112147]">
                    <h3>TBS</h3>
                </div>
                <div className="flex flex-col justify-center items-center h-full ">
                    <div className="w-1/2">
                        <FormInput 
                            type="email" 
                            label="E-postadresse *" 
                            placeholder="Enter your email address"
                            value={email}
                            onChange={handleEmail}
                        />
                        <FormInput 
                            type="password" 
                            label="Password *" 
                            placeholder="*******"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>
                    <Link to="/" className="text-[#66B2FF] my-5">Jeg har glemt mitt passord</Link>
                    <button type="submit" className="bg-[#66B2FF] cursor-pointer rounded-full text-[#fff] font-bold  w-[200px] h-[50px]">
                        Logg inn
                    </button>
                    <Link to="/register" className="flex justify-center items-center border border-[#66B2FF] cursor-pointer mt-10 rounded-full text-[#66B2FF] font-bold w-[200px] h-[50px]">
                        Opprett bruker
                    </Link>
                </div>
                <div className="w-[100%] h-[50px] bg-[#112147]">

                </div>
            </div>
        </>
    );
}
export default Login;