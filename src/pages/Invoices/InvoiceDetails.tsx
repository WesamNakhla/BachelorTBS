import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  InvoiceContainer,
  InvoiceInfo,
  DetailRow,
} from "../../styles/InvoiceStyles";

// Define the Invoice type
interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: string;
  dateIssued: string;
}

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/invoices/${id}`);
        setInvoice(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Failed to fetch invoice:", err.message);
        } else {
          console.error("Unknown error while fetching invoice:", err);
        }
        setError("Failed to fetch invoice details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center", padding: "20px", fontSize: "16px" }}>
          Loading invoice details...
        </p>
      </InvoiceContainer>
    );
  }

  if (error) {
    return (
      <InvoiceContainer>
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      </InvoiceContainer>
    );
  }

  if (!invoice) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center" }}>No invoice data found.</p>
      </InvoiceContainer>
    );
  }

  return (
    <InvoiceContainer style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Invoice Details</h1>
      <InvoiceInfo style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <DetailRow>
          <strong>Invoice #:</strong> <span>{invoice.invoiceNumber}</span>
        </DetailRow>
        <DetailRow>
          <strong>Customer:</strong> <span>{invoice.customer}</span>
        </DetailRow>
        <DetailRow>
          <strong>Amount:</strong> <span>${invoice.amount.toFixed(2)}</span>
        </DetailRow>
        <DetailRow>
          <strong>Status:</strong>{" "}
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "16px",
              backgroundColor: invoice.status === "Paid" ? "#d1fae5" : "#fef3c7",
              color: invoice.status === "Paid" ? "#065f46" : "#92400e",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {invoice.status}
          </span>
        </DetailRow>
        <DetailRow>
          <strong>Date Issued:</strong> <span>{invoice.dateIssued}</span>
        </DetailRow>
      </InvoiceInfo>
    </InvoiceContainer>
  );
};

export default InvoiceDetails;
