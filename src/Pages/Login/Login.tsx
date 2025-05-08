// import { useState } from "react";
// import { Link } from "react-router-dom";
// import FormInput from "../../Components/FormInput/FormInput";
// import { toast } from "react-toastify";
// import axiosInstances from "../../utils/api";
// import { useNavigate } from "react-router-dom";

// interface login {
//     username: string,
//     password: string
// }
// const Login = ()=>{
//     const [ loginData, setLoginData ]  = useState<login>({
//         username: "",
//         password: ""
//     });
//     const [ loading, setLoading ] = useState<boolean>(false);
//     const navigate = useNavigate();
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
//         const { name, value } = e.target;
//         setLoginData((prev)=>({
//             ...prev,
//             [name]: value
//         }))
//     }
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
//         e.preventDefault();
//         setLoading(true);
//         try{
//             const data = {
//                 username: loginData.username,
//                 password: loginData.password
//             }
//             if(!data.username || !data.password){
//                 toast.error("Enter your login credentials");
//                 return false;
//             }
//             let response = await axiosInstances.post("/login", data);
//             console.log(response);
//             setLoading(false);
//             toast.success("You are logged in successfully");
//             navigate("/Dashboard");

//         }catch(err: any){
//             setLoading(false);
//             console.log(err);
//             toast.error(err.response?.data?.message || "An error occured");
//         } 
//     }
//     return (
//         <>
//             <div className="flex flex-col h-[1000px]">
//                 <div className="flex items-center font-bold text-[#fff] w-[100%] h-[50px] p-10 text-lg bg-[#112147]">
//                     <h3>TBS</h3>
//                 </div>
//                 <form className="flex flex-col mt-10 items-center h-full" onSubmit={handleSubmit}>
//                     <div className="w-1/2">
//                         <FormInput 
//                             type="text"
//                             label="Username *" 
//                             placeholder="Enter your username"
//                             value={loginData.username}
//                             onChange={handleChange}
//                             name="username"
//                         />
//                         <FormInput 
//                             type="password" 
//                             label="Password *" 
//                             placeholder="*******"
//                             value={loginData.password}
//                             onChange={handleChange}
//                             name="password"
//                         />
//                     </div>

//                     <button type="submit" className="bg-[#66B2FF] cursor-pointer rounded-full text-[#fff] font-bold  w-[200px] h-[50px]">
//                         { loading ? "Loading..." : "Logg inn" }
//                     </button>
//                     <Link to="/forget-password" className="text-[#66B2FF] my-5">Jeg har glemt mitt passord</Link>
//                 </form>
//                 <div className="w-[100%] h-[50px] bg-[#112147]">

//                 </div>
//             </div>
//         </>
//     );
// }
// export default Login;


// src/pages/Auth/Login.tsx

import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstances from "../../utils/api";


import {
  LoginWrapper,
  LoginTitle,
  Form,
  Input,
  SubmitButton,
  ForgotPasswordLink // ✅ Styled link
} from "../../styles/LoginStyles";

const Login: React.FC = () => {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const data = {
                username: form.username,
                password: form.password
            }
            if(!data.username || !data.password){
                toast.error("Enter your login credentials");
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
    <LoginWrapper>
      <LoginTitle>Logg inn</LoginTitle>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />

        {/* ✅ Link to reset password */}
        <ForgotPasswordLink to="/auth/forgot-password">Forgot your password?</ForgotPasswordLink>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Logger inn..." : "Logg inn"}
        </SubmitButton>
      </Form>
    </LoginWrapper>
  );
};

export default Login;
