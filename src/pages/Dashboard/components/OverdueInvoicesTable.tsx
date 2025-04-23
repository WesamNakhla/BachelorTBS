// 📁 src/pages/Dashboard/components/OverdueInvoicesTable.tsx

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
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  dateIssued: string;
  status: "Paid" | "Pending" | "Overdue";
}

interface OverdueInvoicesTableProps {
  invoices: Invoice[];
}

const OverdueInvoicesTable: React.FC<OverdueInvoicesTableProps> = ({ invoices }) => {
  const overdue = invoices.filter((inv) => inv.status === "Overdue");

  return (
    <DashboardSection>
      <h2>Overdue Invoices</h2>
      {overdue.length > 0 ? (
        <UserTable>
          <TableHead>
            <TableRow>
              <TableHeader>Invoice #</TableHeader>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Date</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {overdue.map((inv) => (
              <TableRow key={inv.id}>
                <TableData>{inv.invoiceNumber}</TableData>
                <TableData>{inv.customer}</TableData>
                <TableData>${inv.amount.toFixed(2)}</TableData>
                <TableData>{new Date(inv.dateIssued).toLocaleDateString()}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </UserTable>
      ) : (
        <p>No overdue invoices at the moment.</p>
      )}
    </DashboardSection>
  );
};

export default OverdueInvoicesTable;
