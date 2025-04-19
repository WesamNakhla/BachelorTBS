// src/pages/Dashboard/Dashboard.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DashboardContainer,
  StatsGrid,
  StatCard,
} from "../../styles/DashboardStyles";
import {
  UserTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
} from "../../styles/UserStyles";
import { Button } from "../../components/ui/Button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dateIssued: string;
}

const STATUS_COLORS: { [key in Invoice["status"]]: string } = {
  Paid: "#10b981",
  Pending: "#facc15",
  Overdue: "#ef4444",
};

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

      {/* 🔘 Actions */}
      <div style={{ display: "flex", gap: "12px", margin: "20px 0", flexWrap: "wrap" }}>
        <Button $variant="primary" onClick={() => navigate("/invoices/create")}>
          + New Invoice
        </Button>
        <Button $variant="secondary" onClick={() => navigate("/users/create")}>
          + Add Customer
        </Button>
        <Button $variant="danger" onClick={() => navigate("/invoices/reports")}>
          Export Report
        </Button>
      </div>

      {/* 🔍 Filters */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        <input type="text" placeholder="Filter by customer" onChange={(e) => setCustomerFilter(e.target.value)} />
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* 📊 Stats Summary */}
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
          <p>${typeof stats.totalRevenue === "number" ? stats.totalRevenue.toFixed(2) : "0.00"}</p>
        </StatCard>
      </StatsGrid>

      {/* 📈 Monthly Revenue */}
      <div style={{ marginTop: "40px" }}>
        <h2>Monthly Revenue</h2>
        {monthlyRevenue.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data to display chart.</p>
        )}
      </div>

      {/* 📊 Invoice Status Distribution */}
      <div style={{ marginTop: "40px" }}>
        <h2>Invoice Status Distribution</h2>
        {recentInvoices.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={["Paid", "Pending", "Overdue"].map((status) => ({
                  name: status,
                  value: recentInvoices.filter((inv) => inv.status === status).length,
                }))}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {["Paid", "Pending", "Overdue"].map((status, index) => (
                  <Cell key={index} fill={STATUS_COLORS[status as Invoice["status"]]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No data to display chart.</p>
        )}
      </div>

      {/* ⏰ Overdue Invoices */}
      <div style={{ marginTop: "40px" }}>
        <h2>Overdue Invoices</h2>
        {filteredInvoices.some((inv) => inv.status === "Overdue") ? (
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
              {filteredInvoices
                .filter((inv) => inv.status === "Overdue")
                .map((inv) => (
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
      </div>

      {/* 🥇 Top Customers by Revenue */}
      <div style={{ marginTop: "40px" }}>
        <h2>Top Customers by Revenue</h2>
        {filteredInvoices.length > 0 ? (
          <UserTable>
            <TableHead>
              <TableRow>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Total</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(
                filteredInvoices.reduce((acc, inv) => {
                  acc[inv.customer] = (acc[inv.customer] || 0) + inv.amount;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([customer, total]) => (
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
      </div>

      {/* 🧮 Average Invoice Amount */}
      <div style={{ marginTop: "40px" }}>
        <h2>Average Invoice Amount</h2>
        {filteredInvoices.length > 0 ? (
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>
            $
            {(
              filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0) /
              filteredInvoices.length
            ).toFixed(2)}
          </p>
        ) : (
          <p>No data to calculate average.</p>
        )}
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
