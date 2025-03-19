import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  InvoiceDetailContainer,
  InvoiceInfo,
  DetailRow,
} from "../../styles/InvoiceStyles";

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    // Fetch invoice details from API
    axios.get(`/api/invoices/${id}`).then((response) => {
      setInvoice(response.data);
    });
  }, [id]);

  if (!invoice) return <p>Loading invoice details...</p>;

  return (
    <InvoiceDetailContainer>
      <h1>Invoice Details</h1>
      <InvoiceInfo>
        <DetailRow><strong>Invoice #:</strong> {invoice.invoiceNumber}</DetailRow>
        <DetailRow><strong>Customer:</strong> {invoice.customer}</DetailRow>
        <DetailRow><strong>Amount:</strong> ${invoice.amount}</DetailRow>
        <DetailRow><strong>Status:</strong> {invoice.status}</DetailRow>
        <DetailRow><strong>Date Issued:</strong> {invoice.dateIssued}</DetailRow>
      </InvoiceInfo>
    </InvoiceDetailContainer>
  );
};

export default InvoiceDetails;
