import styled from 'styled-components';

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const UserContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
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

// Buttons for Actions
export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const EditButton = styled.button`
  background: green;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background: red;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

// Role Management Container
export const RoleContainer = styled.div`
  padding: 20px;
`;

// Form for Assigning Roles
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  cursor: pointer;
`;
