import styled from "styled-components";

// Main container for customer pages
export const CustomerContainer = styled.div`
  padding: 20px;
  width: 100%;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

// Top bar with title and action button
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Add new customer button
export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }
`;

// Search input
export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px 14px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.textSecondary}55;
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

// Customer Table
export const CustomerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  background: ${({ theme }) => theme.primary};
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.background};
  }
`;

export const TableHeader = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.textSecondary}22;
  color: ${({ theme }) => theme.text};
`;

// Action buttons wrapper
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

// Individual buttons
export const ViewButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

export const EditButton = styled.button`
  background: #10b981;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #059669;
  }
`;

export const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

// Info text under the table
export const InfoText = styled.p`
  margin-top: 10px;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
`;

// Form Container
export const CustomerFormContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.textSecondary}55;
  border-radius: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.inputBackground};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }
`;
