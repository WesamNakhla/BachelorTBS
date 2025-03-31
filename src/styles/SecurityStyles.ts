import styled from "styled-components";

// Security Container
export const SecurityContainer = styled.div`
  padding: 20px;
`;

// Security Form
export const SecurityForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 16px;
  }
`;

// Input Fields
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

// Save Button
export const SubmitButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

// Logs Container
export const LogsContainer = styled.div`
  padding: 20px;
`;

// Activity Logs Table
export const LogsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHead = styled.thead`
  background: #6a11cb;
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;
