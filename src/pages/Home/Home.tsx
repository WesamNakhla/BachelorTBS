// File: src/pages/Home/Home.tsx

import React, { useState } from 'react';
import {
  HomeWrapper,
  Section,
  Header,
  Logo,
  LoginButton,
  ServicesGrid,
  ServiceCard,
  AboutText,
  FormWrapper,
  FormGroup,
  Input,
  Textarea,
  SubmitButton,
  ErrorText,
  Footer,
} from "../../styles/HomeStyles";

import validator from 'email-validator';

// Helper to prevent spam messages
const hasRecentlySentMessage = () => {
  const lastSent = localStorage.getItem('lastMessageTime');
  if (!lastSent) return false;
  const oneHour = 60 * 60 * 1000;
  return Date.now() - parseInt(lastSent) < oneHour;
};

const Home = () => {
  // Form state
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = form;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return setError('Please fill in all fields.');
    }

    if (!validator.validate(email)) {
      return setError('Please enter a valid email.');
    }

    if (hasRecentlySentMessage()) {
      return setError('You can only send one message per hour.');
    }

    // TODO: Connect to backend API for sending the message

    setSuccess('Message sent successfully!');
    setForm({ name: '', email: '', subject: '', message: '' });
    localStorage.setItem('lastMessageTime', Date.now().toString());
  };

  return (
    <HomeWrapper>
      {/* Header */}
      <Header>
        <Logo>FishCool Storage</Logo>
        <LoginButton to="/login">Login</LoginButton>
      </Header>

      {/* Services Section */}
      <Section>
        <h2>Our Services</h2>
        <ServicesGrid>
          <ServiceCard>
            <h3>Cold Storage</h3>
            <p>Professional freezing storage for fish distribution companies.</p>
          </ServiceCard>
          <ServiceCard>
            <h3>Quality Control</h3>
            <p>Maintaining ideal temperature and hygiene for long-term storage.</p>
          </ServiceCard>
          <ServiceCard>
            <h3>Logistics Support</h3>
            <p>Assist in transportation and handling logistics for your products.</p>
          </ServiceCard>
        </ServicesGrid>
      </Section>

      {/* About Section */}
      <Section>
        <h2>About Us</h2>
        <AboutText>
          FishCool Storage is a specialized cold storage facility for fish and seafood,
          providing reliable and regulated freezing services for businesses across Norway.
        </AboutText>
      </Section>

      {/* Contact Form */}
      <Section>
        <h2>Contact Us</h2>
        <FormWrapper onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Textarea
              name="message"
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
            />
          </FormGroup>

          {error && <ErrorText>{error}</ErrorText>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <SubmitButton type="submit">Send Message</SubmitButton>
        </FormWrapper>
      </Section>

      {/* Footer */}
      <Footer>
        <p>FishCool Storage AS</p>
        <p>📞 +47 123 456 789</p>
        <p>📍 Oslo, Norway</p>
        <p>Org nr: 987 654 321 MVA</p>
      </Footer>
    </HomeWrapper>
  );
};

export default Home;
