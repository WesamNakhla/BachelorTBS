import { useState, useEffect } from "react";
import React from "react";
import {
  DashboardContainer,
  StatsGrid,
  StatCard,
  RecentInvoices,
} from "../../styles/DashboardStyles";
import {
  UserTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
} from "../../styles/UserStyles";

import axios from "axios";

// Define the type for an invoice
interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: string;
}

const Dashboard: React.FC = () => {
  // State to store statistics data
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  // State to store recent invoices
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard statistics
        const statsResponse = await axios.get("/api/dashboard/stats");
        setStats(statsResponse.data);

        // Fetch recent invoices and ensure it's an array
        const invoicesResponse = await axios.get("/api/dashboard/recent-invoices");
        setRecentInvoices(Array.isArray(invoicesResponse.data) ? invoicesResponse.data : []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>

      {/* Statistics Grid */}
      <StatsGrid>
        <StatCard>
          <h3>Total Invoices</h3>
          <p>{stats.totalInvoices}</p>
        </StatCard>
        <StatCard>
          <h3>Total Customers</h3>
          <p>{stats.totalCustomers}</p>
        </StatCard>
        <StatCard>
          <h3>Total Revenue</h3>
          <p>${stats.totalRevenue}</p>
        </StatCard>
      </StatsGrid>

      {/* Recent Invoices Table */}
      <RecentInvoices>
        <h2>Recent Invoices</h2>
        <UserTable>
          <TableHead>
            <TableRow>
              <TableHeader>Invoice #</TableHeader>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentInvoices.length > 0 ? (
              recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableData>{invoice.invoiceNumber}</TableData>
                  <TableData>{invoice.customer}</TableData>
                  <TableData>${invoice.amount}</TableData>
                  <TableData>{invoice.status}</TableData>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableData colSpan={4} style={{ textAlign: "center" }}>
                  No invoices available
                </TableData>
              </TableRow>
            )}
          </TableBody>
        </UserTable>
      </RecentInvoices>
    </DashboardContainer>
  );
};

export default Dashboard;
