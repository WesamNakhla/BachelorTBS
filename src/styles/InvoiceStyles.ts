import styled from "styled-components";

// 🧾 Invoice Container
export const InvoiceContainer = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.5s ease-in-out;
  transition: all 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// 📋 Table
export const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  color: white;
`;

export const TableRow = styled.tr`
  transition: background-color 0.3s;

  &:nth-child(even) {
    background: #f7f7f7;
  }

  &:hover {
    background: #f0f0f0;
  }
`;

export const TableHeader = styled.th`
  padding: 14px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 14px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  color: #444;
`;

// 🎯 Action Buttons
export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const baseButton = styled.button`
  padding: 8px 14px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: transform 0.2s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ViewButton = styled(baseButton)`
  background: #007bff;

  &:hover {
    background: #0056b3;
  }
`;

export const EditButton = styled(baseButton)`
  background: #28a745;

  &:hover {
    background: #1e7e34;
  }
`;

export const DeleteButton = styled(baseButton)`
  background: #dc3545;

  &:hover {
    background: #bd2130;
  }
`;

// 🧾 Invoice Form
export const InvoiceFormContainer = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  max-width: 620px;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

// 📤 Export / Import / Submit
export const ExportButton = styled(baseButton)`
  background: #6a11cb;

  &:hover {
    background: #5011a5;
  }
`;

export const ImportButton = styled(baseButton)`
  background: #17a2b8;

  &:hover {
    background: #128293;
  }
`;

export const AddInvoiceButton = styled(baseButton)`
  background: #28a745;

  &:hover {
    background: #1e7e34;
  }
`;

export const SubmitButton = styled(baseButton)`
  background: #6a11cb;

  &:hover {
    background: #5011a5;
  }
`;

// 📦 Modal
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  width: 520px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  color: #888;
  cursor: pointer;
`;

// 🎛️ Controls
export const Button = styled(baseButton)`
  background: #6a11cb;

  &:hover {
    background: #5011a5;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  flex-wrap: wrap;
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;

  select {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

export const PageButtons = styled.div`
  display: flex;
  gap: 8px;

  button {
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    font-weight: 500;

    &.active {
      background-color: #007bff;
      color: white;
    }

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;
export const ModalContent = styled.div`
  padding: 20px 0;
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
