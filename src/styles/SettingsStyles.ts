// src/styles/SettingsStyles.ts
import styled from "styled-components";

export const SettingsContainer = styled.div`
  max-width: 920px;
  margin: 20px auto;
  padding: 24px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1),
              0 10px 10px rgba(0, 0, 0, 0.03);
  font-family: 'Roboto', sans-serif;
`;

export const SettingsSection = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.inputBackground};
  border-radius: 16px;
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "rgba(255,255,255,0.05) 0px 1px 3px, rgba(255,255,255,0.04) 0px 2px 6px"
      : "rgba(60, 64, 67, 0.3) 0px 1px 2px, rgba(60, 64, 67, 0.15) 0px 2px 6px"};

  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) =>
      theme.mode === "dark"
        ? "0 4px 12px rgba(255, 255, 255, 0.06)"
        : "0 4px 12px rgba(60, 64, 67, 0.2)"};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  border-bottom: 2px solid ${({ theme }) => theme.textSecondary};
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.textSecondary}33;

  &:last-child {
    border-bottom: none;
  }
`;

export const SettingLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const SettingDescription = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 4px;
  line-height: 1.6;
`;

export const SettingAction = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.primaryDark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const StyledToggle = styled.input`
  width: 48px;
  height: 26px;
  appearance: none;
  background: #ccc;
  border-radius: 26px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background 0.3s ease;

  &:checked {
    background: ${({ theme }) => theme.primary};
  }

  &:before {
    content: "";
    position: absolute;
    width: 22px;
    height: 22px;
    background: #ffffff;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease;
  }

  &:checked:before {
    transform: translateX(22px);
  }
`;

export const ExpandButton = styled.button`
  font-size: 1rem;
  color: ${({ theme }) => theme.primary};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryDark};
  }
`;

export const ExpandableBox = styled.div`
  margin-top: 16px;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
