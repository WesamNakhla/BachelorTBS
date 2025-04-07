import styled from "styled-components";

// === TYPES ===
interface SectionProps {
  $gap?: string;
  $wrap?: boolean;
}

// Main container for the Dashboard
export const DashboardContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  font-family: 'Inter', sans-serif;
  color: ${({ theme }) => theme.text};
`;

// Dashboard title
export const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

// Grid layout for statistics
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

// Individual stat card
export const StatCard = styled.div`
  background: ${({ theme }) => theme.inputBackground};
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }

  h3 {
    font-size: 1rem;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

// Section (with custom props)
export const Section = styled.div<SectionProps>`
  display: flex;
  flex-direction: row;
  gap: ${({ $gap }) => $gap || "16px"};
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : "nowrap")};
  margin-top: 4rem;
`;

// Recent invoices section wrapper
export const RecentInvoices = styled.div`
  margin-top: 3rem;
`;

// Table
export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.75rem;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.inputBackground};
`;

export const TableBody = styled.tbody`
  background-color: ${({ theme }) => theme.inputBackground};
`;

export const TableRow = styled.tr`
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;

export const TableHeader = styled.th`
  padding: 1rem 1.25rem;
  text-align: left;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
`;

export const TableData = styled.td`
  padding: 1rem 1.25rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.textSecondary}33;
`;

// Filters (input + select)
export const FilterInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.textSecondary}55;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.textSecondary}55;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;
