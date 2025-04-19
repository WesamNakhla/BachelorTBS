// src/pages/Invoices/InvoiceList.tsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import {
  InvoiceContainer,
  InvoiceTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ActionButtons,
  PaginationContainer,
  RowsPerPage,
  PageButtons,
} from "../../styles/InvoiceStyles";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

interface Invoice {
  id: number;
  invoiceNumber: string;
  company: string;
  customer: string;
  products: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  tax: number;
  grandTotal: number;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
  date: string;
}

const InvoiceList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null); // ✅ Removed unused variable warning

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/invoices");
      if (Array.isArray(response.data)) {
        setInvoices(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load invoices.");
      toast.error("Failed to load invoices from server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const isVisibleToCustomer = user?.role === "customer" ? inv.customer === user.name : true;
    return matchesSearch && isVisibleToCustomer;
  });

  const filteredByDate = filteredInvoices.filter((inv) => {
    if (!startDate || !endDate) return true;
    const invoiceDate = new Date(inv.date);
    return invoiceDate >= new Date(startDate) && invoiceDate <= new Date(endDate);
  });

  const exportFilteredToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Filtered Invoices", 14, 20);

    const tableData = filteredByDate.map((inv) => [
      inv.invoiceNumber,
      inv.customer,
      format(new Date(inv.date), "yyyy-MM-dd"),
      `${inv.total.toFixed(2)} kr`,
      `${inv.tax}%`,
      `${inv.grandTotal.toFixed(2)} kr`,
    ]);

    const total = filteredByDate.reduce((sum, inv) => sum + inv.total, 0);
    const grand = filteredByDate.reduce((sum, inv) => sum + inv.grandTotal, 0);
    tableData.push(["", "", "Totals", `${total.toFixed(2)} kr`, "", `${grand.toFixed(2)} kr`]);

    autoTable(doc, {
      startY: 30,
      head: [["Invoice #", "Customer", "Date", "Total", "Tax", "Grand Total"]],
      body: tableData,
    });

    doc.save("filtered_invoices.pdf");
    toast.success("PDF generated!");
  };

  const exportAllToPDF = () => {
    const doc = new jsPDF();
    doc.text("All Invoices", 14, 20);
    const tableData = filteredInvoices.map((inv) => [
      inv.invoiceNumber,
      inv.company,
      inv.customer,
      inv.products,
      inv.quantity,
      inv.unit,
      `${inv.unitPrice.toFixed(2)} kr`,
      `${inv.total.toFixed(2)} kr`,
      `${inv.tax}%`,
      `${inv.grandTotal.toFixed(2)} kr`,
      inv.status,
      inv.dueDate,
      inv.date,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Invoice #", "Company", "Customer", "Products", "Qty", "Unit", "Unit Price", "Total", "Tax", "Grand Total", "Status", "Due", "Date"]],
      body: tableData,
    });

    doc.save("all_invoices.pdf");
    toast.success("All invoices exported!");
  };

  const exportSingleInvoiceToPDF = (invoice: Invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Invoice: ${invoice.invoiceNumber}`, 14, 20);

    autoTable(doc, {
      startY: 30,
      body: [
        ["Company", invoice.company],
        ["Customer", invoice.customer],
        ["Products", invoice.products],
        ["Quantity", invoice.quantity.toString()],
        ["Unit", invoice.unit],
        ["Unit Price", `${invoice.unitPrice.toFixed(2)} kr`],
        ["Total", `${invoice.total.toFixed(2)} kr`],
        ["Tax", `${invoice.tax}%`],
        ["Grand Total", `${invoice.grandTotal.toFixed(2)} kr`],
        ["Status", invoice.status],
        ["Date", invoice.date],
        ["Due Date", invoice.dueDate],
      ],
      theme: "grid",
    });

    doc.save(`invoice_${invoice.invoiceNumber}.pdf`);
  };

  const printInvoice = (invoice: Invoice) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head><title>Invoice ${invoice.invoiceNumber}</title></head>
        <body style="font-family: Arial; padding: 24px;">
          <h2>Invoice ${invoice.invoiceNumber}</h2>
          <table border="1" cellpadding="8" cellspacing="0" width="100%">
            <tr><th>Company</th><td>${invoice.company}</td></tr>
            <tr><th>Customer</th><td>${invoice.customer}</td></tr>
            <tr><th>Products</th><td>${invoice.products}</td></tr>
            <tr><th>Quantity</th><td>${invoice.quantity}</td></tr>
            <tr><th>Unit</th><td>${invoice.unit}</td></tr>
            <tr><th>Unit Price</th><td>${invoice.unitPrice.toFixed(2)} kr</td></tr>
            <tr><th>Total</th><td>${invoice.total.toFixed(2)} kr</td></tr>
            <tr><th>Tax</th><td>${invoice.tax}%</td></tr>
            <tr><th>Grand Total</th><td>${invoice.grandTotal.toFixed(2)} kr</td></tr>
            <tr><th>Status</th><td>${invoice.status}</td></tr>
            <tr><th>Date</th><td>${invoice.date}</td></tr>
            <tr><th>Due Date</th><td>${invoice.dueDate}</td></tr>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(indexOfFirst, indexOfLast);

  return (
    <InvoiceContainer>
      <h1>Invoices</h1>

      {/* ✅ Add New Invoice Button */}
      {user?.role !== "customer" && (
        <div style={{ marginBottom: "20px" }}>
          <Button $variant="primary" onClick={() => navigate("/invoices/create")}>
            + New Invoice
          </Button>
        </div>
      )}

      <input
        type="text"
        placeholder="Search invoices..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ActionButtons>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button $variant="ghost" onClick={exportFilteredToPDF}>Export by Date</Button>
        {user?.role !== "customer" && (
          <Button $variant="ghost" onClick={exportAllToPDF}>Export All</Button>
        )}
      </ActionButtons>

      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <InvoiceTable>
            <TableHead>
              <TableRow>
                <TableHeader>Invoice #</TableHeader>
                <TableHeader>Company</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Products</TableHeader>
                <TableHeader>Qty</TableHeader>
                <TableHeader>Unit</TableHeader>
                <TableHeader>Unit Price</TableHeader>
                <TableHeader>Total</TableHeader>
                <TableHeader>Tax</TableHeader>
                <TableHeader>Grand Total</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Due</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableData>{inv.invoiceNumber}</TableData>
                    <TableData>{inv.company}</TableData>
                    <TableData>{inv.customer}</TableData>
                    <TableData>{inv.products}</TableData>
                    <TableData>{inv.quantity}</TableData>
                    <TableData>{inv.unit}</TableData>
                    <TableData>{inv.unitPrice.toFixed(2)} kr</TableData>
                    <TableData>{inv.total.toFixed(2)} kr</TableData>
                    <TableData>{inv.tax}%</TableData>
                    <TableData>{inv.grandTotal.toFixed(2)} kr</TableData>
                    <TableData>{inv.status}</TableData>
                    <TableData>{inv.dueDate}</TableData>
                    <TableData>{inv.date}</TableData>
                    <TableData>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        <Button $variant="ghost" onClick={() => navigate(`/invoices/${inv.id}`)}>View</Button>
                        <Button $variant="ghost" onClick={() => exportSingleInvoiceToPDF(inv)}>⬇ PDF</Button>
                        <Button $variant="ghost" onClick={() => printInvoice(inv)}>🖨 Print</Button>
                      </div>
                    </TableData>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableData colSpan={14} style={{ textAlign: "center", padding: "20px" }}>
                    No invoices found.
                  </TableData>
                </TableRow>
              )}
            </TableBody>
          </InvoiceTable>
        </div>
      )}

      <PaginationContainer>
        <RowsPerPage>
          <label htmlFor="rows">Rows per page:</label>
          <select id="rows" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </RowsPerPage>
        <PageButtons>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </PageButtons>
      </PaginationContainer>
    </InvoiceContainer>
  );
};

export default InvoiceList;
