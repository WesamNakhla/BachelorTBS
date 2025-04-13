// src/pages/Auth/Login.tsx

import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

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
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, password } = form;

    if (!username || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        login(); // ✅ simulate auth success
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid username or password.");
      }
      setLoading(false);
    }, 1000);
  };

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
