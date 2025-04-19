// src/pages/Invoices/InvoiceDetails.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  InvoiceContainer,
  InvoiceInfo,
  DetailRow,
} from "@/styles/InvoiceStyles";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

interface Invoice {
  id: number;
  invoiceNumber: string;
  company: string;
  customer: {
    name: string;
    email: string;
    address: string;
    postCode: string;
    city: string;
  };
  products: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  tax: number;
  grandTotal: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  dueDate?: string;
}

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/api/invoices/${id}`);
        const data = response.data;

        // ✅ Check customer access
        if (user?.role === "customer" && data.customer?.name !== user.name) {
          setError("Du har ikke tilgang til denne fakturaen.");
        } else {
          setInvoice(data);
        }
      } catch (err) {
        console.error("Error fetching invoice:", err);
        setError("Kunne ikke hente fakturadetaljer.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id, user]);

  if (!user) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center", color: "red" }}>
          Du har ikke tilgang til denne siden. Vennligst logg inn.
        </p>
      </InvoiceContainer>
    );
  }

  if (loading) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center", padding: "20px", fontSize: "16px" }}>
          Laster fakturadetaljer...
        </p>
      </InvoiceContainer>
    );
  }

  if (error) {
    return (
      <InvoiceContainer>
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Button onClick={() => navigate("/invoices")}>← Tilbake</Button>
        </div>
      </InvoiceContainer>
    );
  }

  if (!invoice) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center" }}>Ingen fakturadata funnet.</p>
      </InvoiceContainer>
    );
  }

  return (
    <InvoiceContainer style={{ maxWidth: "750px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>FAKTURA</h1>

      <InvoiceInfo style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <DetailRow>
          <strong>Fakturanummer:</strong> <span>{invoice.invoiceNumber}</span>
        </DetailRow>
        <DetailRow>
          <strong>Firma:</strong> <span>{invoice.company}</span>
        </DetailRow>
        <DetailRow>
          <strong>Kunde:</strong> <span>{invoice.customer.name}</span>
        </DetailRow>
        <DetailRow>
          <strong>E-post:</strong> <span>{invoice.customer.email}</span>
        </DetailRow>
        <DetailRow>
          <strong>Adresse:</strong>{" "}
          <span>
            {invoice.customer.address}, {invoice.customer.postCode}, {invoice.customer.city}
          </span>
        </DetailRow>
        <DetailRow>
          <strong>Dato:</strong>{" "}
          <span>{new Date(invoice.date).toLocaleDateString("no-NO")}</span>
        </DetailRow>
        {invoice.dueDate && (
          <DetailRow>
            <strong>Forfallsdato:</strong>{" "}
            <span>{new Date(invoice.dueDate).toLocaleDateString("no-NO")}</span>
          </DetailRow>
        )}
        <DetailRow>
          <strong>Status:</strong>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "16px",
              backgroundColor:
                invoice.status === "Paid" ? "#d1fae5" :
                invoice.status === "Overdue" ? "#fee2e2" : "#fef9c3",
              color:
                invoice.status === "Paid" ? "#065f46" :
                invoice.status === "Overdue" ? "#991b1b" : "#92400e",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {invoice.status === "Paid" ? "Betalt" : invoice.status}
          </span>
        </DetailRow>
      </InvoiceInfo>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ marginBottom: "16px" }}>Produkt(er)</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead style={{ background: "#f3f4f6" }}>
            <tr>
              <th style={{ padding: "10px", textAlign: "left" }}>Produkt</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Antall</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Enhet</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Pris/stk</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: "1px solid #e5e7eb" }}>
              <td style={{ padding: "10px" }}>{invoice.products}</td>
              <td style={{ padding: "10px" }}>{invoice.quantity}</td>
              <td style={{ padding: "10px" }}>{invoice.unit}</td>
              <td style={{ padding: "10px" }}>{invoice.unitPrice.toFixed(2)} kr</td>
              <td style={{ padding: "10px" }}>{invoice.total.toFixed(2)} kr</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "24px", textAlign: "right" }}>
          <p>
            <strong>MVA ({invoice.tax}%):</strong> {((invoice.total * invoice.tax) / 100).toFixed(2)} kr
          </p>
          <p>
            <strong>Å betale (inkl. MVA):</strong>{" "}
            {invoice.grandTotal.toFixed(2)} kr
          </p>
        </div>
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Button onClick={() => navigate("/invoices")}>← Tilbake til fakturaer</Button>
      </div>
    </InvoiceContainer>
  );
};

export default InvoiceDetails;
