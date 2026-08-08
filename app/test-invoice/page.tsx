import InvoiceLayout from "../ui/Invoice";
import { Invoice } from "@/context/invoice/invoiceReducer";

const dummyInvoice: Invoice = {
  invoiceInfo: {
    invoiceNo: "101",
    invoiceDate: "08-08-2026",
    invoiceTransport: "ABC Transport",
    invoiceChallan: "CH-001",
    invoiceLr: "LR-001",
    invoiceSendFrom: "Jamnagar",
    invoiceSendTo: "Ahmedabad",
    invoiceSupplyDate: "08-08-2026",
  },
  invoiceClient: {
    billedTo: {
      clientName: "Test Client Pvt Ltd",
      clientCity: "Jamnagar",
      clientPincode: "361001",
      clientState: "Gujarat",
      clientGst: "24AAAAA0000A1Z5",
    },
    shippedTo: {
      clientName: "Test Client Pvt Ltd",
      clientCity: "Jamnagar",
      clientPincode: "361001",
      clientState: "Gujarat",
      clientGst: "24AAAAA0000A1Z5",
    },
  },
  invoiceItems: [
    {
      itemPerticular: "Cotton Fabric",
      itemPieces: 10,
      itemPrice: 500,
      total: 5000,
    },
    {
      itemPerticular: "Silk Fabric",
      itemPieces: 5,
      itemPrice: 1200,
      total: 6000,
    },
  ],
};

export default function TestInvoicePage() {
  return (
    <div className="min-h-screen flex justify-center py-10 bg-gray-200">
      <InvoiceLayout invoice={dummyInvoice} />
    </div>
  );
}