// File: src/pages/Home/HomeStyles.ts

import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Wrapper for the entire home page
export const HomeWrapper = styled.div`
  background: linear-gradient(to bottom right, #e0f7fa, #ffffff);
  padding: 0;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  color: ${({ theme }) => theme.text};
`;

// Header with company name and login button
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

export const Logo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

// Styled login button
export const LoginButton = styled(Link)`
  background-color: white;
  color: ${({ theme }) => theme.primary};
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: white;
  }
`;

// Generic section container
export const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.primary};
  }
`;

// Grid for services
export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  justify-items: center;
`;

export const ServiceCard = styled.div`
  background-color: #ffffffcc;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.primary};
  }

  p {
    font-size: 0.95rem;
  }

  &:hover {
    transform: translateY(-8px);
  }
`;

// About section text
export const AboutText = styled.p`
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.textSecondary};
`;

// Contact form styles
export const FormWrapper = styled.form`
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.9rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

export const ErrorText = styled.p`
  color: red;
  margin-top: -1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

// Footer styles
export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  text-align: center;
  padding: 2rem;
  font-size: 0.95rem;

  p {
    margin: 0.2rem 0;
  }
`;
