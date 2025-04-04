import React, { useState } from "react";
import {
  SettingsContainer,
  SettingsSection,
  SectionHeader,
  SectionContent,
  ExpandableBox,
  ExpandButton,
  ToggleWrapper,
  SettingItem,
  SettingLabel,
  SettingDescription,
  SettingAction,
} from "../../styles/SettingsStyles";
import ThemeToggle from "../../components/ThemeToggle";

const Settings = () => {
  // States for toggles and collapsible sections
  const [isSecurityExpanded, setIsSecurityExpanded] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isAutoUpdateEnabled, setIsAutoUpdateEnabled] = useState(false);

  // Toggle visibility of the security section
  const toggleSecuritySettings = () => {
    setIsSecurityExpanded((prev) => !prev);
  };

  return (
    <SettingsContainer>
      <h1>Settings</h1>

      {/* Appearance Section */}
      <SettingsSection>
        <SectionHeader>Appearance</SectionHeader>
        <SectionContent>
          <SettingItem>
            <SettingLabel>Dark Mode</SettingLabel>
            <SettingDescription>
              Toggle between light and dark themes.
            </SettingDescription>
            <SettingAction>
              <ThemeToggle />
            </SettingAction>
          </SettingItem>
        </SectionContent>
      </SettingsSection>

      {/* Security Section */}
      <SettingsSection>
        <SectionHeader>
          Security Settings
          <ExpandButton onClick={toggleSecuritySettings}>
            {isSecurityExpanded ? "Hide" : "Show"}
          </ExpandButton>
        </SectionHeader>

        {isSecurityExpanded && (
          <ExpandableBox>
            <SettingItem>
              <SettingLabel>Two-Factor Authentication</SettingLabel>
              <SettingDescription>
                Enable 2FA for stronger security using an authenticator app.
              </SettingDescription>
              <SettingAction>
                <button>Enable</button>
              </SettingAction>
            </SettingItem>

            <SettingItem>
              <SettingLabel>Activity Logs</SettingLabel>
              <SettingDescription>
                View all recent login activity on your account.
              </SettingDescription>
              <SettingAction>
                <button>View Logs</button>
              </SettingAction>
            </SettingItem>

            <SettingItem>
              <SettingLabel>Change Password</SettingLabel>
              <SettingDescription>
                It is recommended to change your password regularly.
              </SettingDescription>
              <SettingAction>
                <button>Update</button>
              </SettingAction>
            </SettingItem>

            <SettingItem>
              <SettingLabel>Login Sessions</SettingLabel>
              <SettingDescription>
                View and manage active login sessions for this account.
              </SettingDescription>
              <SettingAction>
                <button>Manage</button>
              </SettingAction>
            </SettingItem>
          </ExpandableBox>
        )}
      </SettingsSection>

      {/* System Settings */}
      <SettingsSection>
        <SectionHeader>System</SectionHeader>
        <SectionContent>
          <SettingItem>
            <SettingLabel>Enable Notifications</SettingLabel>
            <SettingDescription>
              Receive email or push alerts for account activity.
            </SettingDescription>
            <SettingAction>
              <ToggleWrapper>
                <input
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
                <input
                  type="checkbox"
                  checked={isAutoUpdateEnabled}
                  onChange={() =>
                    setIsAutoUpdateEnabled(!isAutoUpdateEnabled)
                  }
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
