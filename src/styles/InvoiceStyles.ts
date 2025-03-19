import styled from "styled-components";

// Invoice Container
export const InvoiceContainer = styled.div`
  padding: 20px;
`;

// Invoice Table
export const InvoiceTable = styled.table`
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

// Buttons for Actions
export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const ViewButton = styled.button`
  background: blue;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
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

// Invoice Form
export const InvoiceFormContainer = styled.div`
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
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
// Export Buttons
export const ExportButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;
