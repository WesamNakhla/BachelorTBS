// 📁 src/pages/Dashboard/components/StatCards.tsx

import React from "react";
import {
  CardGrid,
  StyledCard,
  IconCircle,
  StatDetails,
} from "../../../styles/DashboardStyles/StatCardsStyles";
import { FileText, Users, DollarSign } from "lucide-react";

interface StatCardsProps {
  totalInvoices?: number;
  totalCustomers?: number;
  totalRevenue?: number;
}

const StatCards: React.FC<StatCardsProps> = ({
  totalInvoices = 0,
  totalCustomers = 0,
  totalRevenue = 0,
}) => {
  const formattedRevenue =
    typeof totalRevenue === "number" && !isNaN(totalRevenue)
      ? totalRevenue.toFixed(2)
      : "0.00";

  return (
    <CardGrid>
      <StyledCard $color="#3b82f6">
        <IconCircle $color="#3b82f6">
          <FileText />
        </IconCircle>
        <StatDetails>
          <h4>Total Invoices</h4>
          <p>{totalInvoices}</p>
        </StatDetails>
      </StyledCard>

      <StyledCard $color="#10b981">
        <IconCircle $color="#10b981">
          <Users />
        </IconCircle>
        <StatDetails>
          <h4>Total Customers</h4>
          <p>{totalCustomers}</p>
        </StatDetails>
      </StyledCard>

      <StyledCard $color="#f59e0b">
        <IconCircle $color="#f59e0b">
          <DollarSign />
        </IconCircle>
        <StatDetails>
          <h4>Total Revenue</h4>
          <p>${formattedRevenue}</p>
        </StatDetails>
      </StyledCard>
    </CardGrid>
  );
};

export default StatCards;
