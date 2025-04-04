
import React, { useState } from "react";
import {
  SecurityContainer,
  SecurityForm,
  Input,
  SubmitButton,
} from "../../styles/SecurityStyles";
import axios from "axios";

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    enable2FA: false,
    accountLockThreshold: 5,
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleToggle2FA = async () => {
    try {
      const response = await axios.post("/api/security/enable-2fa", {
        enable: !settings.enable2FA,
      });
      setSettings({ ...settings, enable2FA: response.data.enable2FA });
      alert("Two-Factor Authentication updated successfully!");
    } catch (error) {
      alert("Failed to update 2FA settings.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/security/update-settings", settings);
      alert("Security settings updated successfully!");
    } catch (error) {
      alert("Failed to update security settings.");
    }
  };

  return (
    <SecurityContainer>
      <h1>Security Settings</h1>
      <SecurityForm onSubmit={handleSubmit}>
        <label>
          Enable Two-Factor Authentication (2FA):
          <input type="checkbox" checked={settings.enable2FA} onChange={handleToggle2FA} />
        </label>
        <label>
          Account Lock Threshold:
          <Input name="accountLockThreshold" type="number" value={settings.accountLockThreshold} onChange={handleChange} />
        </label>
        <SubmitButton type="submit">Save Settings</SubmitButton>
      </SecurityForm>
    </SecurityContainer>
  );
};

export default SecuritySettings;
