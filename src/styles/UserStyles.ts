import styled from 'styled-components';

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const UserContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

export const TableHead = styled.thead`
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f2f6fc;
  }
  &:hover {
    background: #e6f0ff;
    transition: background 0.3s ease;
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
  border-bottom: 1px solid #e0e0e0;
  color: #333;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const EditButton = styled.button`
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #0f766e;
  }
`;

export const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #dc2626;
  }
`;

export const RoleContainer = styled.div`
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const SubmitButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: #4a0ca0;
  }
`;
