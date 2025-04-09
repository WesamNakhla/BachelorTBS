// src/styles/UserStyles.ts
import styled from "styled-components";

/* ==== MAIN CONTAINER ==== */
export const UserContainer = styled.div`
  padding: 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

/* ==== TABLE STYLES ==== */
export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.headerBackground || "#f3f4f6"};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground || "#f3f4f6"};
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 14px 18px;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 14px 18px;
  font-size: 14px;
  color: ${({ theme }) => theme.subText || "#4b5563"};
  vertical-align: middle;
`;

/* ==== HEADER BAR ==== */
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

/* ==== SEARCH & FILTER ==== */
export const SearchInput = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  flex: 1;
  min-width: 250px;
  background-color: ${({ theme }) => theme.inputBackground || "#ffffff"};
  color: ${({ theme }) => theme.text};
`;

export const FilterSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.inputBackground || "#ffffff"};
  color: ${({ theme }) => theme.text};
`;

/* ==== ADD BUTTON ==== */

export const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary || "#3b82f6"};
  color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || "#2563eb"};
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background-color: #e5e7eb;
    color: #9ca3af;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

/* ==== ACTION BUTTONS ==== */
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ViewButton = styled.button`
  background-color: #e0f2fe;
  color: #0369a1;
  border: none;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #bae6fd;
  }
`;

export const EditButton = styled.button`
  background-color: #fef9c3;
  color: #92400e;
  border: none;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #fde68a;
  }
`;

export const DeleteButton = styled.button`
  background-color: #fee2e2;
  color: #991b1b;
  border: none;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #fecaca;
  }
`;

/* ==== USER DETAIL ROW ==== */
export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #d1d5db;
  padding-bottom: 8px;
  font-size: 15px;

  span {
    color: #374151;
    font-weight: 500;
  }

  strong {
    color: #111827;
    font-weight: 600;
    min-width: 120px;
  }
`;

/* ==== FORM ELEMENTS (if reused) ==== */
export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.inputBackground || "#fff"};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

export const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.inputBackground || "#fff"};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
