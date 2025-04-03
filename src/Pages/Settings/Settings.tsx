import { useState } from "react";
import {
  SettingsContainer,
  SettingsForm,
  Input,
  SubmitButton,
} from "../../styles/SettingsStyles";
import axios from "axios";
// import ThemeToggle from "../../components/ThemeToggle";

const Settings = () => {
  const [settings, setSettings] = useState({
    username: "John Doe",
    email: "johndoe@example.com",
    language: "English",
  });

  const handleChange = (e: any) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post("/api/settings/update", settings).then(() => {
      alert("Settings updated successfully!");
    });
  };

  return (
    <SettingsContainer>
      <SettingsForm onSubmit={handleSubmit}>
        <label>
          Username:
          <Input name="username" value={settings.username} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <Input name="email" type="email" value={settings.email} onChange={handleChange} required />
        </label>
        <label>
          Language:
          <Input name="language" value={settings.language} onChange={handleChange} required />
        </label>
        <SubmitButton type="submit">Save Settings</SubmitButton>
      </SettingsForm>

      {/* Theme Toggle */}
      {/* <ThemeToggle /> */}
    </SettingsContainer>
  );
};

export default Settings;
