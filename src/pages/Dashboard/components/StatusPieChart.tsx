// 📁 src/pages/Dashboard/components/StatusPieChart.tsx

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import DashboardSection from "../../../styles/DashboardStyles/DashboardSection";

interface StatusPieChartProps {
  invoices: {
    status: "Paid" | "Pending" | "Overdue";
  }[];
}

const STATUS_COLORS: { [key in "Paid" | "Pending" | "Overdue"]: string } = {
  Paid: "#10b981",
  Pending: "#facc15",
  Overdue: "#ef4444",
};

const StatusPieChart: React.FC<StatusPieChartProps> = ({ invoices }) => {
  const data = ["Paid", "Pending", "Overdue"].map((status) => ({
    name: status,
    value: invoices.filter((inv) => inv.status === status).length,
  }));

  return (
    <DashboardSection>
      <h2>Invoice Status Distribution</h2>
      {invoices.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.name as "Paid" | "Pending" | "Overdue"]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No data to display chart.</p>
      )}
    </DashboardSection>
  );
};

export default StatusPieChart;
