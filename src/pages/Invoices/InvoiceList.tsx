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
}

const InvoiceList = () => {
  // State to store invoices
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search functionality
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  // Fetch invoices from API
  const fetchInvoices = useCallback(async () => {
    try {
      const response = await axios.get("/api/invoices");
      
      // Ensure response is an array before setting state
      if (Array.isArray(response.data)) {
        setInvoices(response.data);
      } else {
        console.error("Error: API response is not an array", response.data);
        setInvoices([]); // Set as empty array to prevent filter errors
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setInvoices([]); // Prevent issues by ensuring an empty array
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Ensure invoices is always an array before filtering
  const filteredInvoices = Array.isArray(invoices)
    ? invoices.filter((invoice) =>
        invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
        <ExportButton onClick={() => alert("Exporting to PDF...")}>
          Export
        </ExportButton>
        <ImportButton onClick={() => alert("Importing data...")}>
          Import
        </ImportButton>
        <AddInvoiceButton onClick={() => setIsModalOpen(true)}>
          + Ny faktura
        </AddInvoiceButton>
      </ActionButtons>

      {/* Invoice Table */}
      <InvoiceTable>
        <TableHead>
          <TableRow>
            <TableHeader>Invoice #</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableData>{invoice.invoiceNumber}</TableData>
                <TableData>{invoice.customer}</TableData>
                <TableData>${invoice.amount}</TableData>
                <TableData>{invoice.status}</TableData>
                <TableData>
                  <button
                    onClick={() => alert(`Viewing invoice ${invoice.invoiceNumber}`)}
                  >
                    👁
                  </button>
                  <button
                    onClick={() => alert(`Editing invoice ${invoice.invoiceNumber}`)}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => alert(`Deleting invoice ${invoice.invoiceNumber}`)}
                  >
                    🗑
                  </button>
                </TableData>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableData colSpan={5} style={{ textAlign: "center", padding: "15px" }}>
                No invoices found.
              </TableData>
            </TableRow>
          )}
        </TableBody>
      </InvoiceTable>

      {/* Invoice Modal */}
      {isModalOpen && <InvoiceModal onClose={() => setIsModalOpen(false)} />}
    </InvoiceContainer>
  );
};

export default InvoiceList;
