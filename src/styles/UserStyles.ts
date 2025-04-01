// Removed duplicate import

// Container for all user-related pages
export const UserContainer = styled.div`
  padding: 24px;
  width: 100%;
`;

// Table styles
export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const TableHead = styled.thead`
  background-color: #f9fafb;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 14px 18px;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 14px 18px;
  font-size: 14px;
  color: #4b5563;
  vertical-align: middle;
`;

// Top bar with title and add button
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

// Search input style
export const SearchInput = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  flex: 1;
  min-width: 250px;
  background-color: #ffffff;
`;

// Filter dropdown
export const FilterSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
`;

// Add button
export const AddButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

// Action buttons container
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

// View button
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

// Edit button
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

// Delete button
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

// Detail row for user details page
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
`;

import styled from "styled-components";

export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff;
  width: 100%;
`;

export const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff;
  width: 100%;
`;
