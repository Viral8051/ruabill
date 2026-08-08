import dbConnect from "@/lib/mongoDb";
import Invoice from "@/models/Invoice";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ invoiceNo: string[] }> }
) {
  const { invoiceNo } = await params;
  const invoiceNoStr = invoiceNo.join("/");

  return NextResponse.json({
    message: "GET works",
    invoiceNo: invoiceNoStr,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ invoiceNo: string[] }> }
) {
  const { invoiceNo } = await params;
  const invoiceNoStr = invoiceNo.join("/"); // "CT-26", "27-001" -> "CT-26/27-001"

  await dbConnect();

  const deletedInvoice = await Invoice.findOneAndDelete({
    "invoiceInfo.invoiceNo": invoiceNoStr,
  });

  if (!deletedInvoice) {
    return NextResponse.json(
      { success: false, message: "Invoice not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    deletedInvoice,
  });
}