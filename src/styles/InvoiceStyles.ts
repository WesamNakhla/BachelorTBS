import styled from "styled-components";

/* ==== LAYOUT WRAPPERS ==== */
export const InvoiceContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.inputBackground};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.3s ease-in-out;

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

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

/* ==== TABLE STYLES ==== */
export const InvoiceTable = styled.table`
  width: 100%;
  margin-top: 24px;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 8px;
`;

export const TableHead = styled.thead`
  background: ${({ theme }) => theme.primary};
  color: #fff;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e2e6ea;
  transition: background-color 0.2s;

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.inputBackground};
  }

  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
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
  color: ${({ theme }) => theme.text};
`;

/* ==== SEARCH INPUT ==== */
export const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.textSecondary}55;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

/* ==== STATUS BADGE ==== */
export const StatusBadge = styled.span<{ status: "Paid" | "Pending" | "Overdue" }>`
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 13px;
  background-color: ${({ status }) =>
    status === "Paid"
      ? "#d1fae5"
      : status === "Overdue"
      ? "#fee2e2"
      : "#fef9c3"};
  color: ${({ status }) =>
    status === "Paid"
      ? "#065f46"
      : status === "Overdue"
      ? "#991b1b"
      : "#92400e"};
`;

/* ==== ACTION GROUP ==== */
export const ActionGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

/* ==== ACTION BUTTONS ==== */
export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin: 16px 0;
  flex-wrap: wrap;
`;

export const Button = styled.button`
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
      background-color: ${({ theme }) => theme.primary};
      color: #fff;
    }

    &:hover {
      background-color: ${({ theme }) => theme.secondary}33;
    }
  }
`;

/* ==== MODAL ==== */
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
  background: ${({ theme }) => theme.inputBackground};
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    width: 90%;
    padding: 16px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
  margin-bottom: 16px;

  h3 {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CloseButton = styled.button`
  font-size: 20px;
  color: #aaa;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

/* ==== FORM ELEMENTS ==== */
export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.inputBackground};
  transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    background-color: #ffffff;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.inputBackground};
  transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }
`;

/* ==== INVOICE INFO VIEW ==== */
export const InvoiceInfo = styled.div`
  background-color: ${({ theme }) => theme.inputBackground};
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 0;

  span {
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 500;
  }

  strong {
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    min-width: 120px;
  }
`;
