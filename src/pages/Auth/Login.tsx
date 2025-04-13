// src/pages/Auth/Login.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Styled components for login form
import {
  LoginWrapper,
  LoginTitle,
  Form,
  Input,
  SubmitButton
} from "../../styles/LoginStyles";

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Form state for email and password
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Logged in successfully.");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (error) {
        toast.error("Server error. Please try again later.");
        console.error(error); // ✅ Marks it as used
      } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginTitle>Logg inn</LoginTitle>

      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-post"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Passord"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Logger inn..." : "Logg inn"}
        </SubmitButton>
      </Form>
    </LoginWrapper>
  );
};

export default Login;
