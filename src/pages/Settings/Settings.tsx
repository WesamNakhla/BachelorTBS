// src/pages/Settings.tsx
import React, { useState } from "react";
import {
  SettingsContainer,
  SettingsSection,
  SectionHeader,
  SectionContent,
  ExpandableBox,
  ExpandButton,
  StyledToggle,
  StyledButton,
  SettingItem,
  SettingLabel,
  SettingDescription,
  SettingAction,
  ToggleWrapper,
} from "../../styles/SettingsStyles";
// Removed ThemeToggle in favor of our custom implementation

const Settings = () => {
  // State variables for toggling sections and settings
  const [isSecurityExpanded, setIsSecurityExpanded] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isAutoUpdateEnabled, setIsAutoUpdateEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle the visibility of the security section
  const toggleSecuritySettings = () => {
    setIsSecurityExpanded((prev) => !prev);
  };

  // Function to toggle dark mode by adding/removing a CSS class on the document body
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      document.body.classList.toggle("dark-mode", newValue);
      return newValue;
    });
  };

  return (
    <SettingsContainer>
      {/* Main Title */}
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>
        Settings
      </h1>

      {/* Appearance Section */}
      <SettingsSection>
        <SectionHeader>
          <span style={{ display: "flex", alignItems: "center" }}>
            <i className="fas fa-paint-brush" style={{ marginRight: "8px" }}></i>
            Appearance
          </span>
        </SectionHeader>
        <SectionContent>
          <SettingItem>
            <SettingLabel>Dark Mode</SettingLabel>
            <SettingDescription>
              Toggle between light and dark themes.
            </SettingDescription>
            <SettingAction>
              <ToggleWrapper>
                <StyledToggle
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
              </ToggleWrapper>
            </SettingAction>
          </SettingItem>
        </SectionContent>
      </SettingsSection>

      {/* Security Section */}
      <SettingsSection>
        <SectionHeader>
          <span style={{ display: "flex", alignItems: "center" }}>
            <i className="fas fa-shield-alt" style={{ marginRight: "8px" }}></i>
            Security Settings
          </span>
          <ExpandButton onClick={toggleSecuritySettings}>
            {isSecurityExpanded ? "Hide" : "Show"}
          </ExpandButton>
        </SectionHeader>
        {isSecurityExpanded && (
          <ExpandableBox>
            <SectionContent>
              <SettingItem>
                <SettingLabel>Two-Factor Authentication</SettingLabel>
                <SettingDescription>
                  Enable 2FA for stronger security using an authenticator app.
                </SettingDescription>
                <SettingAction>
                  <StyledButton>Enable</StyledButton>
                </SettingAction>
              </SettingItem>
              <SettingItem>
                <SettingLabel>Activity Logs</SettingLabel>
                <SettingDescription>
                  View all recent login activity on your account.
                </SettingDescription>
                <SettingAction>
                  <StyledButton>View Logs</StyledButton>
                </SettingAction>
              </SettingItem>
              <SettingItem>
                <SettingLabel>Change Password</SettingLabel>
                <SettingDescription>
                  It is recommended to change your password regularly.
                </SettingDescription>
                <SettingAction>
                  <StyledButton>Update</StyledButton>
                </SettingAction>
              </SettingItem>
              <SettingItem>
                <SettingLabel>Login Sessions</SettingLabel>
                <SettingDescription>
                  View and manage active login sessions for this account.
                </SettingDescription>
                <SettingAction>
                  <StyledButton>Manage</StyledButton>
                </SettingAction>
              </SettingItem>
            </SectionContent>
          </ExpandableBox>
        )}
      </SettingsSection>

      {/* System Settings */}
      <SettingsSection>
        <SectionHeader>
          <span style={{ display: "flex", alignItems: "center" }}>
            <i className="fas fa-cogs" style={{ marginRight: "8px" }}></i>
            System
          </span>
        </SectionHeader>
        <SectionContent>
          <SettingItem>
            <SettingLabel>Enable Notifications</SettingLabel>
            <SettingDescription>
              Receive email or push alerts for account activity.
            </SettingDescription>
            <SettingAction>
              <ToggleWrapper>
                <StyledToggle
                  type="checkbox"
                  checked={isNotificationsEnabled}
                  onChange={() =>
                    setIsNotificationsEnabled(!isNotificationsEnabled)
                  }
                />
              </ToggleWrapper>
            </SettingAction>
          </SettingItem>
          <SettingItem>
            <SettingLabel>Auto Update</SettingLabel>
            <SettingDescription>
              Automatically apply updates when available.
            </SettingDescription>
            <SettingAction>
              <ToggleWrapper>
                <StyledToggle
                  type="checkbox"
                  checked={isAutoUpdateEnabled}
                  onChange={() => setIsAutoUpdateEnabled(!isAutoUpdateEnabled)}
                />
              </ToggleWrapper>
            </SettingAction>
          </SettingItem>
        </SectionContent>
      </SettingsSection>
    </SettingsContainer>
  );
};

export default Settings;
