import styled from "styled-components";

// 🎨 Invoice list container
export const InvoiceContainer = styled.div`
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

// 📑 Invoice table styles
export const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
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
  padding: 12px;
  text-align: left;
  font-size: 14px;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #333;
`;

// 🎭 Action buttons for table
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

// 🔵 View Button
export const ViewButton = styled.button`
  background: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

// 🟢 Edit Button
export const EditButton = styled.button`
  background: #28a745;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #218838;
  }
`;

// 🔴 Delete Button
export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #c82333;
  }
`;

// 📝 Invoice form styles
export const InvoiceFormContainer = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
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
  font-size: 14px;
`;

// ✅ Submit Button
export const SubmitButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #4e0ca0;
  }
`;

// 📥 Export and Import Buttons
export const ExportButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 10px;

  &:hover {
    background: #4e0ca0;
  }
`;

export const ImportButton = styled.button`
  background: #17a2b8;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #117a8b;
  }
`;

// ➕ Add Invoice Button
export const AddInvoiceButton = styled.button`
  background: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #218838;
  }
`;

// 🖼 Modal styles for invoice form popup
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
`;

export const ModalContent = styled.div`
  padding: 20px 0;
`;

// 🟣 General Button Style
export const Button = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #4e0ca0;
  }
`;

// 🔽 Select Dropdown
export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background: white;
  cursor: pointer;
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  select {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

export const PageButtons = styled.div`
  display: flex;
  gap: 6px;

  button {
    padding: 6px 10px;
    border-radius: 4px;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;

    &.active {
      background-color: #007bff;
      color: white;
    }

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;