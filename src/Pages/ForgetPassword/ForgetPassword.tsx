

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstances from "../../utils/api";
import {
  ForgotWrapper,
  ForgotTitle,
  Form,
  Input,
  SubmitButton,
  BackLink,
} from "../../styles/ForgotPasswordStyles";

interface forgetPassword {
    email: string,
}
const ForgotPassword: React.FC = () => {
    const [ forgetPassword, setForgetPassword ]  = useState<forgetPassword>({
        email: ""
    });
  const [loading, setLoading] = useState(false);
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
    <ForgotWrapper>
      <Form onSubmit={handleSubmit}>
        <ForgotTitle>Forgot Password</ForgotTitle>
        <Input
          type="email"
          placeholder="Enter your email"
          value={forgetPassword.email}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </SubmitButton>
        <BackLink onClick={() => navigate("/auth/login")}>
          Back to Login
        </BackLink>
      </Form>
    </ForgotWrapper>
  );
};

export default ForgotPassword;
