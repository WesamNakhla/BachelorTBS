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

// Invoice type definition
interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/invoices");

      if (Array.isArray(response.data)) {
        setInvoices(response.data);
      } else {
        setInvoices([]);
        setError("Invalid data format received from server.");
      }
    } catch (error: unknown) {
      setError("Failed to load invoices. Error: " + (error as Error).message);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/invoices/${id}`);
      toast.success("✅ Invoice deleted successfully!");
      fetchInvoices(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete invoice.");
    }
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search Input */}
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

      {/* Action Buttons */}
      <ActionButtons style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "16px 0" }}>
        <Button variant="ghost" onClick={() => alert("Exporting to PDF...")}>Export</Button>
        <Button variant="ghost" onClick={() => alert("Importing data...")}>Import</Button>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ New Invoice</Button>
      </ActionButtons>

      {/* Table */}
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
                      <span style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontWeight: 500,
                        fontSize: "13px",
                        backgroundColor: invoice.status === "Paid" ? "#d1fae5" : "#fef9c3",
                        color: invoice.status === "Paid" ? "#065f46" : "#92400e",
                      }}>
                        {invoice.status}
                      </span>
                    </TableData>
                    <TableData>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        <Button
                          variant="ghost"
                          title="View"
                          onClick={() => alert(`Viewing invoice ${invoice.invoiceNumber}`)}
                        >
                          👁
                        </Button>
                        <Button
                          variant="ghost"
                          title="Download"
                          onClick={() => alert(`Downloading invoice ${invoice.invoiceNumber}`)}
                        >
                          ⬇
                        </Button>
                        <Button
                          variant="danger"
                          title="Delete"
                          onClick={() => handleDelete(invoice.id)}
                        >
                          🗑
                        </Button>
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

      {/* Pagination Controls */}
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

      {/* Modal */}
      {isModalOpen && <InvoiceModal onClose={() => setIsModalOpen(false)} />}
    </InvoiceContainer>
  );
};

export default InvoiceList;
