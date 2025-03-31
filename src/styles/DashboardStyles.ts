import styled from 'styled-components';

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

export const StatCard = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
`;

export const RecentInvoices = styled.div`
  margin-top: 30px;
`;

export const TableHead = styled.thead`
  background-color: #f0f0f0;
`;

export const TableBody = styled.tbody`
  background-color: #ffffff;
`;

export const DashboardContainer = styled.div`
  padding: 20px;
`;

export const DashboardTitle = styled.h1`
  font-size: 24px;
  color: #333;
`;

// Adding missing exports
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

export const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;
