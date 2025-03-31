import styled from "styled-components";

// Settings Container
export const SettingsContainer = styled.div`
  padding: 20px;
`;

// Settings Form
export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 16px;
  }
`;

// Input Fields
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

// Save Button
export const SubmitButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

// Toggle Button for Dark/Light Mode
export const ToggleButton = styled.button`
  background: #222;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
`;
