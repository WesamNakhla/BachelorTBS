// src/styles/LoginStyles.ts
import styled from "styled-components";

// Wrapper for the entire login area
export const LoginWrapper = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

// Title of the login form
export const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
`;

// Login form container
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Styled input fields
export const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
`;

// Styled submit button
export const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #667eea;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #556cd6;
  }

  &:disabled {
    background-color: #a3bffa;
    cursor: not-allowed;
  }
`;
