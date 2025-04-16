// src/pages/Invoices/InvoiceList.tsx

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
import InvoiceModal from "./InvoiceModal";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
}

const InvoiceList = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/invoices");
      if (Array.isArray(response.data)) {
        setInvoices(response.data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load invoices.");
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this invoice?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/invoices/${id}`);
      toast.success("Invoice deleted successfully!");
      fetchInvoices();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete invoice.");
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesQuery = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const isVisibleToCustomer =
      user?.role === "customer" ? invoice.customer === user.name : true;
    return matchesQuery && isVisibleToCustomer;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(indexOfFirst, indexOfLast);

  const goToPage = (page: number) => setCurrentPage(page);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <InvoiceContainer>
      <h1>Invoices</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Search invoices..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "300px",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
        }}
      />

      {user?.role !== "customer" && (
        <ActionButtons style={{ margin: "16px 0", gap: "12px", flexWrap: "wrap" }}>
          <Button $variant="ghost" onClick={() => alert("Exporting to PDF...")}>
            Export
          </Button>
          <Button $variant="ghost" onClick={() => alert("Importing data...")}>
            Import
          </Button>
          <Button $variant="primary" onClick={() => setIsModalOpen(true)}>
            + New Invoice
          </Button>
        </ActionButtons>
      )}

      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <InvoiceTable>
            <TableHead>
              <TableRow>
                <TableHeader>Invoice #</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader className="hide-sm">Amount</TableHeader>
                <TableHeader className="hide-sm">Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableData>{invoice.invoiceNumber}</TableData>
                    <TableData>{invoice.customer}</TableData>
                    <TableData>{invoice.date}</TableData>
                    <TableData className="hide-sm">${invoice.amount.toFixed(2)}</TableData>
                    <TableData className="hide-sm">
                      <span
                        style={{
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontWeight: 500,
                          fontSize: "13px",
                          backgroundColor:
                            invoice.status === "Paid"
                              ? "#d1fae5"
                              : invoice.status === "Overdue"
                              ? "#fee2e2"
                              : "#fef9c3",
                          color:
                            invoice.status === "Paid"
                              ? "#065f46"
                              : invoice.status === "Overdue"
                              ? "#991b1b"
                              : "#92400e",
                        }}
                      >
                        {invoice.status}
                      </span>
                    </TableData>
                    <TableData>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        <Button
                          $variant="ghost"
                          onClick={() => alert(`Viewing invoice ${invoice.invoiceNumber}`)}
                        >
                          👁
                        </Button>
                        <Button
                          $variant="ghost"
                          onClick={() => alert(`Downloading invoice ${invoice.invoiceNumber}`)}
                        >
                          ⬇
                        </Button>
                        {user?.role !== "customer" && (
                          <Button
                            $variant="danger"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            🗑
                          </Button>
                        )}
                      </div>
                    </TableData>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableData colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
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
          <select id="rows" value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </RowsPerPage>
        <PageButtons>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </PageButtons>
      </PaginationContainer>

      {isModalOpen && user?.role !== "customer" && (
        <InvoiceModal onClose={() => setIsModalOpen(false)} />
      )}
    </InvoiceContainer>
  );
};

export default InvoiceList;
