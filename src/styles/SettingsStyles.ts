// src/styles/SettingsStyles.ts
import styled from "styled-components";

// Main container for all settings sections
export const SettingsContainer = styled.div`
  padding: 32px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

// Individual section block (e.g., Appearance, Security)
export const SettingsSection = styled.div`
  background-color: ${({ theme }) => theme.cardBg || "#fff"};
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease;
`;

// Section header
export const SectionHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary || "#111827"};
  margin-bottom: 16px;
`;

// Content inside each section
export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Regular input field
export const Input = styled.input`
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.inputBg || "#fff"};
  color: ${({ theme }) => theme.inputText || "#111827"};
  width: 100%;
`;

// Save/submit button
export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.success || "#10b981"};
  color: white;
  border: none;
  padding: 10px 18px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.successDark || "#059669"};
  }
`;

// Simple visual divider between sections
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 16px 0;
`;

// Flex layout row for inputs/controls
export const FlexRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

// Label for inputs or toggles
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary || "#374151"};
`;

// Expandable section wrapper
export const ExpandableBox = styled.div`
  background-color: ${({ theme }) => theme.cardBg || "#fff"};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 12px;
  overflow: hidden;
`;

// Expand/collapse button
export const ExpandButton = styled.button`
  all: unset;
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary || "#111827"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.sectionHeaderBg || "#f3f4f6"};

  &:hover {
    background-color: ${({ theme }) => theme.hoverBg || "#e5e7eb"};
  }
`;

// Collapsible content area
// Wrapper for custom toggle elements like checkboxes or switches
export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding-top: 4px;

  input[type="checkbox"] {
    width: 40px;
    height: 20px;
    appearance: none;
    background-color: #d1d5db;
    border-radius: 999px;
    position: relative;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:checked {
      background-color: #4f46e5;
    }

    &::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.3s ease;
    }

    &:checked::before {
      transform: translateX(20px);
    }
  }
`;

// Individual setting item inside a section
export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
`;

// Setting label (left text)
export const SettingLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary || "#1f2937"};
`;

// Description below label
export const SettingDescription = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary || "#6b7280"};
  margin-top: 4px;
`;

// Right side action (e.g., switch or button)
export const SettingAction = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
// ToggleButton used in ThemeToggle for switching themes
export const ToggleButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBg || "#4f46e5"};
  color: ${({ theme }) => theme.buttonText || "#ffffff"};
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover || "#4338ca"};
  }
`;
