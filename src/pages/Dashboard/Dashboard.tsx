// 📁 src/pages/Dashboard/Dashboard.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Importing reusable dashboard components
import StatCards from "./components/StatCards";
import RevenueChart from "./components/RevenueChart";
import StatusPieChart from "./components/StatusPieChart";
import OverdueInvoicesTable from "./components/OverdueInvoicesTable";
import TopCustomersTable from "./components/TopCustomersTable";
import AverageInvoiceCard from "./components/AverageInvoiceCard";

// Layout and UI
import { DashboardContainer } from "../../styles/DashboardStyles/DashboardContainer";
import DashboardSection from "../../styles/DashboardStyles/DashboardSection";
import { Button } from "../../components/ui/Button";

interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dateIssued: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<
    { month: string; revenue: number }[]
  >([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter invoices based on search fields
  const filteredInvoices = recentInvoices.filter((inv) => {
    const date = new Date(inv.dateIssued);
    const inStartRange = startDate ? date >= new Date(startDate) : true;
    const inEndRange = endDate ? date <= new Date(endDate) : true;
    const matchesCustomer = customerFilter
      ? inv.customer.toLowerCase().includes(customerFilter.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? inv.status === statusFilter : true;
    return inStartRange && inEndRange && matchesCustomer && matchesStatus;
  });

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, invoicesRes] = await Promise.all([
          axios.get("/api/dashboard/stats"),
          axios.get("/api/dashboard/recent-invoices"),
        ]);

        setStats(statsRes.data || {
          totalInvoices: 0,
          totalCustomers: 0,
          totalRevenue: 0,
        });

        const invoices = Array.isArray(invoicesRes.data)
          ? invoicesRes.data
          : [];
        setRecentInvoices(invoices);

        // Prepare revenue chart data
        const monthly: { [month: string]: number } = {};
        invoices.forEach((inv: Invoice) => {
          const month = new Date(inv.dateIssued).toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          monthly[month] = (monthly[month] || 0) + inv.amount;
        });

        const chartData = Object.entries(monthly).map(([month, revenue]) => ({
          month,
          revenue,
        }));

        setMonthlyRevenue(chartData);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "12px", margin: "20px 0", flexWrap: "wrap" }}>
        <Button $variant="primary" onClick={() => navigate("/invoices/create")}>
          + New Invoice
        </Button>
        <Button $variant="secondary" onClick={() => navigate("/users/create")}>
          + Add Customer
        </Button>
      </div>

      {/* Filters Section */}
      <DashboardSection>
        <h2>Filters</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            aria-label="Start Date"
          />
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            aria-label="End Date"
          />
          <input
            type="text"
            placeholder="Filter by customer"
            onChange={(e) => setCustomerFilter(e.target.value)}
            aria-label="Customer Name"
          />
          <select onChange={(e) => setStatusFilter(e.target.value)} aria-label="Invoice Status">
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </DashboardSection>

      {/* Dashboard Data Sections */}
      <StatCards
        totalInvoices={stats.totalInvoices}
        totalCustomers={stats.totalCustomers}
        totalRevenue={stats.totalRevenue}
      />

      <RevenueChart data={monthlyRevenue} />

      <StatusPieChart invoices={recentInvoices} />

      <OverdueInvoicesTable invoices={filteredInvoices} />

      <TopCustomersTable invoices={filteredInvoices} />

      <AverageInvoiceCard invoices={filteredInvoices} />
    </DashboardContainer>
  );
};

export default Dashboard;
