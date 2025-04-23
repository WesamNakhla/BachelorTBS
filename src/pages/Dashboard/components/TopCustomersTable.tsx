// 📁 src/pages/Dashboard/components/TopCustomersTable.tsx

import React from "react";
import {
  UserTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
} from "../../../styles/UserStyles";
import DashboardSection from "../../../styles/DashboardStyles/DashboardSection";

interface Invoice {
  customer: string;
  amount: number;
}

interface TopCustomersTableProps {
  invoices: Invoice[];
}

const TopCustomersTable: React.FC<TopCustomersTableProps> = ({ invoices }) => {
  const revenueMap: Record<string, number> = invoices.reduce((acc, inv) => {
    acc[inv.customer] = (acc[inv.customer] || 0) + inv.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedTop = Object.entries(revenueMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <DashboardSection>
      <h2>Top Customers by Revenue</h2>
      {sortedTop.length > 0 ? (
        <UserTable>
          <TableHead>
            <TableRow>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Total</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTop.map(([customer, total]) => (
              <TableRow key={customer}>
                <TableData>{customer}</TableData>
                <TableData>${total.toFixed(2)}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </UserTable>
      ) : (
        <p>No customer data available.</p>
      )}
    </DashboardSection>
  );
};

export default TopCustomersTable;
