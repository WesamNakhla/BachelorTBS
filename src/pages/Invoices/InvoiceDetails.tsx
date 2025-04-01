import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  InvoiceContainer,
  InvoiceInfo,
  DetailRow,
} from "../../styles/InvoiceStyles";
import { Button } from "../../components/ui/Button";

// Extended invoice type
interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postCode: string;
  };
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dateIssued: string;
  dueDate?: string;
  items?: string;
}

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/invoices/${id}`);
        setInvoice(response.data);
      } catch (err: unknown) {
        console.error("Error fetching invoice:", err);
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
    <InvoiceContainer style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1>Invoice Details</h1>

      <InvoiceInfo style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <DetailRow>
          <strong>Invoice #:</strong> <span>{invoice.invoiceNumber}</span>
        </DetailRow>
        <DetailRow>
          <strong>Customer:</strong> <span>{invoice.customer.name}</span>
        </DetailRow>
        <DetailRow>
          <strong>Email:</strong> <span>{invoice.customer.email}</span>
        </DetailRow>
        <DetailRow>
          <strong>Address:</strong>{" "}
          <span>{invoice.customer.address}, {invoice.customer.postCode}, {invoice.customer.city}</span>
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
              backgroundColor: invoice.status === "Paid" ? "#d1fae5" :
                               invoice.status === "Overdue" ? "#fee2e2" : "#fef9c3",
              color: invoice.status === "Paid" ? "#065f46" :
                     invoice.status === "Overdue" ? "#991b1b" : "#92400e",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {invoice.status}
          </span>
        </DetailRow>
        <DetailRow>
          <strong>Date Issued:</strong>{" "}
          <span>{new Date(invoice.dateIssued).toLocaleDateString()}</span>
        </DetailRow>
        {invoice.dueDate && (
          <DetailRow>
            <strong>Due Date:</strong>{" "}
            <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
          </DetailRow>
        )}
        {invoice.items && (
          <DetailRow style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <strong>Description:</strong>
            <p style={{ margin: 0, paddingTop: "6px" }}>{invoice.items}</p>
          </DetailRow>
        )}
      </InvoiceInfo>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Button onClick={() => navigate("/invoices")}>← Back to Invoices</Button>
      </div>
    </InvoiceContainer>
  );
};

export default InvoiceDetails;
