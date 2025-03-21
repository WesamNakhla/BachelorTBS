import { useState, useEffect, useCallback } from "react";
import {
  InvoiceContainer,
  InvoiceTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ActionButtons,
  ExportButton,
  ImportButton,
  AddInvoiceButton,
  PaginationContainer,
  RowsPerPage,
  PageButtons
} from "../../styles/InvoiceStyles";
import InvoiceModal from "./InvoiceModal";
import axios from "axios";

// Define the structure of an Invoice
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

  // Fetch invoices from API
  const fetchInvoices = useCallback(async () => {
    try {
      const response = await axios.get("/api/invoices");
      if (Array.isArray(response.data)) {
        setInvoices(response.data);
      } else {
        console.error("Error: API response is not an array", response.data);
        setInvoices([]);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setInvoices([]);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(indexOfFirst, indexOfLast);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <InvoiceContainer>
      <h1>Fakturaer</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search invoices..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "250px",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Action Buttons */}
      <ActionButtons>
        <ExportButton onClick={() => alert("Exporting to PDF...")}>Export</ExportButton>
        <ImportButton onClick={() => alert("Importing data...")}>Import</ImportButton>
        <AddInvoiceButton onClick={() => setIsModalOpen(true)}>+ Ny faktura</AddInvoiceButton>
      </ActionButtons>

      {/* Invoice Table */}
      <InvoiceTable>
        <TableHead>
          <TableRow>
            <TableHeader>Invoice #</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Status</TableHeader>
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
                <TableData>${invoice.amount}</TableData>
                <TableData>{invoice.status}</TableData>
                <TableData>
                  <button onClick={() => alert(`Viewing invoice ${invoice.invoiceNumber}`)}>👁 View</button>
                  <button onClick={() => alert(`Downloading invoice ${invoice.invoiceNumber}`)}>⬇ Download</button>
                  <button onClick={() => alert(`Deleting invoice ${invoice.invoiceNumber}`)}>🗑 Delete</button>
                </TableData>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableData colSpan={6} style={{ textAlign: "center", padding: "15px" }}>
                No invoices found.
              </TableData>
            </TableRow>
          )}
        </TableBody>
      </InvoiceTable>

      {/* Pagination Controls */}
      <PaginationContainer>
        <RowsPerPage>
          <label>Rows per page:</label>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
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
