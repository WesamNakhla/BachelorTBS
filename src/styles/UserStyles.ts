import styled from "styled-components";

/* ==== MAIN CONTAINER ==== */
export const UserContainer = styled.div`
  padding: 32px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

/* ==== TABLE STYLES ==== */
export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.cardBackground};
  text-transform: uppercase;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor || "#e5e7eb"};
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 16px 20px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.subText || "#4b5563"};
  background-color: ${({ theme }) => theme.cardBackground};
`;

/* ==== HEADER BAR ==== */
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

/* ==== SEARCH & FILTER ==== */
export const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  min-width: 300px;
  flex: 1;
  background-color: ${({ theme }) => theme.inputBackground || "#ffffff"};
  color: ${({ theme }) => theme.text};
`;

export const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.inputBackground || "#ffffff"};
  color: ${({ theme }) => theme.text};
`;

/* ==== PAGINATION ==== */
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
  gap: 12px;
`;

export const RowsPerPage = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

export const PageButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    background-color: ${({ theme }) => theme.primary || "#3b82f6"};
    color: white;

    &:disabled {
      background-color: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
    }
  }
`;

/* ==== ADD BUTTON ==== */
export const AddButton = styled.button`
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary || "#3b82f6"};
  color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || "#2563eb"};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

/* ==== ACTION BUTTONS ==== */
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ViewButton = styled.button`
  background-color: #dbeafe;
  color: #1e40af;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #bfdbfe;
  }
`;

export const EditButton = styled.button`
  background-color: #fef9c3;
  color: #92400e;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fde68a;
  }
`;

export const DeleteButton = styled.button`
  background-color: #fee2e2;
  color: #991b1b;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fecaca;
  }
`;

/* ==== USER DETAIL ROW ==== */
export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #d1d5db;
  padding-bottom: 8px;
  font-size: 15px;
  gap: 8px;

  span {
    color: #374151;
    font-weight: 500;
  }

  strong {
    color: #111827;
    font-weight: 600;
    min-width: 140px;
  }
`;

/* ==== FORM ELEMENTS ==== */
export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBackground || "#ffffff"};
  color: ${({ theme }) => theme.text};
`;

export const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBackground || "#ffffff"};
  color: ${({ theme }) => theme.text};
`;

/* ==== MODAL COMPONENTS ==== */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: ${({ theme }) => theme.cardBackground || "#ffffff"};
  border-radius: 16px;
  max-height: 90vh;
  overflow: hidden;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
`;

/* ==== MODAL CONTENT SCROLL ==== */
export const ModalContentScrollable = styled.div`
  max-height: 85vh;
  overflow-y: auto;
  padding: 24px;
  background-color: ${({ theme }) => theme.cardBackground || "#ffffff"};
  border-radius: 16px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 8px;
  }
`;
