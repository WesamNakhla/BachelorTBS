import { useState, useEffect } from "react";
import {
  InvoiceContainer,
  InvoiceTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ActionButtons,
  ExportButton
} from "../../styles/InvoiceStyles";
import axios from "axios";
import { exportToPDF, exportToExcel } from "../../utils/ExportUtils";

// تعريف نوع الفاتورة
interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: string;
}

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("/api/invoices");
        setInvoices(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to load invoices.");
        console.error("Error fetching invoices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <InvoiceContainer>
      <h1>Invoice List</h1>

      {/* عرض رسالة تحميل */}
      {loading && <p>Loading invoices...</p>}

      {/* عرض رسالة خطأ إن وجدت */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* زر تصدير البيانات */}
      <ActionButtons>
        <ExportButton 
          onClick={() => exportToPDF(invoices, "Invoice Report")}
          disabled={invoices.length === 0}
        >
          Export to PDF
        </ExportButton>
        <ExportButton 
          onClick={() => exportToExcel(invoices, "Invoice Report")}
          disabled={invoices.length === 0}
        >
          Export to Excel
        </ExportButton>
      </ActionButtons>

      {/* عرض جدول الفواتير إذا كانت البيانات متاحة */}
      {!loading && !error && invoices.length > 0 ? (
        <InvoiceTable>
          <TableHead>
            <TableRow>
              <TableHeader>Invoice #</TableHeader>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableData>{invoice.invoiceNumber}</TableData>
                <TableData>{invoice.customer}</TableData>
                <TableData>${invoice.amount}</TableData>
                <TableData>{invoice.status}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </InvoiceTable>
      ) : (
        !loading && <p>No invoices available.</p>
      )}
    </InvoiceContainer>
  );
};

export default InvoiceList;
