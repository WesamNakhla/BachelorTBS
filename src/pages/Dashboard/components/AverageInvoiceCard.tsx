// 📁 src/pages/Dashboard/components/AverageInvoiceCard.tsx

import React from "react";
import DashboardSection from "../../../styles/DashboardStyles/DashboardSection";
import styled from "styled-components";

interface Invoice {
  amount: number;
}

interface AverageInvoiceCardProps {
  invoices: Invoice[];
}

const AverageValue = styled.p`
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin-top: 8px;
`;

const AverageInvoiceCard: React.FC<AverageInvoiceCardProps> = ({ invoices }) => {
  const average =
    invoices.length > 0
      ? invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length
      : 0;

  return (
    <DashboardSection>
      <h2>Average Invoice Amount</h2>
      {invoices.length > 0 ? (
        <AverageValue>${average.toFixed(2)}</AverageValue>
      ) : (
        <p>No data to calculate average.</p>
      )}
    </DashboardSection>
  );
};

export default AverageInvoiceCard;
