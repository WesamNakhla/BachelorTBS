// src/styles/InvoiceStyles.ts
import styled, { keyframes } from "styled-components";

/* ==== ANIMATIONS ==== */
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ==== MODAL ==== */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.cardBackground || "#fff"};
  color: ${({ theme }) => theme.text};
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 90%;
  animation: ${slideIn} 0.3s ease;

  @media (max-width: 768px) {
    width: 95%;
    padding: 24px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 22px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.3s ease;

  @media (max-width: 600px) {
    width: 90%;
    padding: 16px;
  }
`;

/* ==== LAYOUT ==== */
export const InvoiceContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.cardBackground || "#ffffff"};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

/* ==== TABLE ==== */
export const InvoiceTable = styled.table`
  width: 100%;
  margin-top: 24px;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 8px;
`;

export const TableHead = styled.thead`
  background: linear-gradient(90deg, #5a0ebc, #1e5bbf);
  color: #fff;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e2e6ea;

  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #f1f3f5;
  }

  transition: background-color 0.2s;
`;

export const TableHeader = styled.th`
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 14px 18px;
  font-size: 14px;
  border-bottom: 1px solid #e2e6ea;
  color: ${({ theme }) => theme.text || "#333"};
`;

/* ==== FORM ELEMENTS ==== */
export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  color: #111827;
  background-color: #f9fafb;
  transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  color: #111827;
  background-color: #f9fafb;
  transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

/* ==== BUTTON BASE ==== */
const baseButton = styled.button`
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

export const ExportButton = styled(baseButton)`
  background-color: #5a0ebc;

  &:hover {
    background-color: #4b0f9c;
  }
`;

export const ImportButton = styled(baseButton)`
  background-color: #1e5bbf;

  &:hover {
    background-color: #164a96;
  }
`;

export const AddInvoiceButton = styled(baseButton)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

/* ==== PAGINATION ==== */
export const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

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
    background: #f1f1f1;
    cursor: pointer;

    &.active {
      background-color: #007bff;
      color: #fff;
    }

    &:hover {
      background-color: #e2e6ea;
    }
  }
`;

/* ==== ACTION BUTTONS ==== */
export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin: 16px 0;
  flex-wrap: wrap;
`;

/* ==== INVOICE DETAILS BOX ==== */
export const InvoiceInfo = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
`;

/* ==== DETAIL ROW (LABEL + VALUE) ==== */
export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 0;

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
