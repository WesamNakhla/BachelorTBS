// src/pages/Invoices/InvoiceDetails.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { InvoiceContainer } from "@/styles/InvoiceStyles";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

// Extend jsPDF to include lastAutoTable
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

interface Customer {
  name: string;
  email: string;
  address: string;
  postCode: string;
  city: string;
  phone: string;
}

interface InventoryItem {
  arrivalDate: string;
  departureDate: string;
  customer: string;
  goods: string;
  type: string;
  quantity: number;
  weight: number;
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  company: string;
  customer: Customer;
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
  inventoryItems: InventoryItem[];
  bankInfo: {
    accountNumber: string;
    kidNumber: string;
  };
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

  const handleDownloadPDF = () => {
    if (!invoice) return;

    const doc = new jsPDF() as jsPDFWithAutoTable;

    doc.setFontSize(18);
    doc.text("Faktura", 14, 20);

    doc.setFontSize(12);
    doc.text(`Selskap: ${invoice.company}`, 14, 30);
    doc.text(`Fakturanr: ${invoice.invoiceNumber}`, 14, 38);
    doc.text(`Dato: ${new Date(invoice.date).toLocaleDateString("no-NO")}`, 14, 46);
    if (invoice.dueDate) {
      doc.text(`Forfallsdato: ${new Date(invoice.dueDate).toLocaleDateString("no-NO")}`, 14, 54);
    }
    doc.text(`Kunde: ${invoice.customer.name}`, 14, 62);
    doc.text(`Adresse: ${invoice.customer.address}, ${invoice.customer.postCode} ${invoice.customer.city}`, 14, 70);
    doc.text(`Telefon: ${invoice.customer.phone}`, 14, 78);
    doc.text(`E-post: ${invoice.customer.email}`, 14, 86);

    autoTable(doc, {
      startY: 96,
      head: [["Produkt", "Antall", "Enhet", "Pris/stk", "Total"]],
      body: [[
        invoice.products,
        invoice.quantity.toString(),
        invoice.unit,
        `${invoice.unitPrice.toFixed(2)} kr`,
        `${invoice.total.toFixed(2)} kr`
      ]]
    });

    const y1 = doc.lastAutoTable?.finalY ?? 100;

    doc.text(`MVA (${invoice.tax}%): ${((invoice.total * invoice.tax) / 100).toFixed(2)} kr`, 14, y1 + 10);
    doc.text(`Totalt inkl. MVA: ${invoice.grandTotal.toFixed(2)} kr`, 14, y1 + 18);

    autoTable(doc, {
      startY: y1 + 28,
      head: [["Ankomst", "Kunde", "Vare", "Type", "Antall", "Vekt", "Avgang"]],
      body: invoice.inventoryItems.map(item => [
        item.arrivalDate,
        item.customer,
        item.goods,
        item.type,
        item.quantity.toString(),
        item.weight.toString(),
        item.departureDate
      ])
    });

    const y2 = doc.lastAutoTable?.finalY ?? y1 + 50;

    doc.text("Betalingsinformasjon", 14, y2 + 10);
    doc.text(`Konto: ${invoice.bankInfo.accountNumber}`, 14, y2 + 18);
    doc.text(`KID: ${invoice.bankInfo.kidNumber}`, 14, y2 + 26);

    doc.save(`Faktura_${invoice.invoiceNumber}.pdf`);
  };

  if (!user) {
    return (
      <InvoiceContainer>
        <p style={{ color: "red", textAlign: "center" }}>
          Du har ikke tilgang til denne siden.
        </p>
      </InvoiceContainer>
    );
  }

  if (loading) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center", padding: "24px" }}>
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

  const totalQty = invoice.inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = invoice.inventoryItems.reduce((sum, item) => sum + item.weight, 0);

  return (
    <InvoiceContainer style={{ maxWidth: "1000px", margin: "0 auto", backgroundColor: "#fff", padding: "32px", borderRadius: "12px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginBottom: "24px" }}>
        <Button onClick={() => navigate("/invoices")}>← Tilbake</Button>
        <Button onClick={handleDownloadPDF}>⬇ Last ned PDF</Button>
      </div>
      {/* Invoice Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h2>{invoice.company}</h2>
          <p>Stanseveien 33, 0976 Oslo</p>
          <p>Email: firmapost@tbs.no</p>
          <p>Org.nr: 916 411 258</p>
        </div>
        <div>
          <h1 style={{ fontSize: "28px", color: "#dc2626" }}>FAKTURA</h1>
          <p><strong>Fakturanr:</strong> {invoice.invoiceNumber}</p>
          <p><strong>Dato:</strong> {new Date(invoice.date).toLocaleDateString("no-NO")}</p>
          {invoice.dueDate && <p><strong>Forfallsdato:</strong> {new Date(invoice.dueDate).toLocaleDateString("no-NO")}</p>}
          <p><strong>Status:</strong> {invoice.status === "Paid" ? "Betalt" : invoice.status}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div style={{ marginBottom: "28px" }}>
        <h3>Kundeinformasjon</h3>
        <p><strong>{invoice.customer.name}</strong></p>
        <p>{invoice.customer.address}, {invoice.customer.postCode} {invoice.customer.city}</p>
        <p>Tlf: {invoice.customer.phone}</p>
        <p>E-post: {invoice.customer.email}</p>
      </div>

      {/* Product Info */}
      <div style={{ marginBottom: "32px" }}>
        <h3>Fakturadetaljer</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th style={{ padding: "10px" }}>Produkt</th>
              <th style={{ padding: "10px" }}>Antall</th>
              <th style={{ padding: "10px" }}>Enhet</th>
              <th style={{ padding: "10px" }}>Pris/stk</th>
              <th style={{ padding: "10px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>{invoice.products}</td>
              <td style={{ padding: "10px" }}>{invoice.quantity}</td>
              <td style={{ padding: "10px" }}>{invoice.unit}</td>
              <td style={{ padding: "10px" }}>{invoice.unitPrice.toFixed(2)} kr</td>
              <td style={{ padding: "10px" }}>{invoice.total.toFixed(2)} kr</td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <p><strong>MVA ({invoice.tax}%):</strong> {((invoice.total * invoice.tax) / 100).toFixed(2)} kr</p>
          <p><strong>Totalt inkl. MVA:</strong> {invoice.grandTotal.toFixed(2)} kr</p>
        </div>
      </div>

      {/* Inventory Info */}
      <div style={{ marginBottom: "32px" }}>
        <h3>Vedlagt godsliste</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th style={{ padding: "8px" }}>Ankomst</th>
              <th style={{ padding: "8px" }}>Kunde</th>
              <th style={{ padding: "8px" }}>Vare</th>
              <th style={{ padding: "8px" }}>Type</th>
              <th style={{ padding: "8px" }}>Antall</th>
              <th style={{ padding: "8px" }}>Vekt (kg)</th>
              <th style={{ padding: "8px" }}>Avgang</th>
            </tr>
          </thead>
          <tbody>
            {invoice.inventoryItems.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "8px" }}>{item.arrivalDate}</td>
                <td style={{ padding: "8px" }}>{item.customer}</td>
                <td style={{ padding: "8px" }}>{item.goods}</td>
                <td style={{ padding: "8px" }}>{item.type}</td>
                <td style={{ padding: "8px" }}>{item.quantity}</td>
                <td style={{ padding: "8px" }}>{item.weight}</td>
                <td style={{ padding: "8px" }}>{item.departureDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: "8px" }}>
          <strong>Total antall:</strong> {totalQty} &nbsp; | &nbsp;
          <strong>Total vekt:</strong> {totalWeight.toFixed(1)} kg
        </p>
      </div>

      {/* Bank Info */}
      <div style={{ marginBottom: "32px" }}>
        <h3>Betalingsinformasjon</h3>
        <p><strong>Konto:</strong> {invoice.bankInfo.accountNumber}</p>
        <p><strong>KID:</strong> {invoice.bankInfo.kidNumber}</p>
      </div>
    </InvoiceContainer>
  );
};

export default InvoiceDetails;
