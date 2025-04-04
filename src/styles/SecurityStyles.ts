// src/styles/SecurityStyles.ts
import styled from "styled-components";

export const SecurityContainer = styled.div`
  padding: 24px;
  max-width: 700px;
  margin: 0 auto;
`;

export const SecurityForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff;
  width: 100%;
`;

export const SubmitButton = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

// Optional table styles for logs
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const TableHead = styled.thead`
  background-color: #f3f4f6;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

export const TableHeader = styled.th`
  padding: 14px;
  font-size: 14px;
  text-align: left;
`;

export const TableData = styled.td`
  padding: 14px;
  font-size: 14px;
  color: #4b5563;
`;
// Existing exports from SecurityStyles

// Add LogsContainer export
export const LogsContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

// Add LogsTable export if missing
export const LogsTable = styled.table`
  /* Add your table styles here */
`;