import dbConnect from "@/lib/mongoDb";
import Invoice from "@/models/Invoice";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ invoiceNo: string }> }
) {
  const { invoiceNo } = await params;

  return NextResponse.json({
    message: "GET works",
    invoiceNo,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ invoiceNo: string }> }
) {
  const { invoiceNo } = await params; // ✅ THIS LINE FIXES EVERYTHING

  await dbConnect();

  const deletedInvoice = await Invoice.findOneAndDelete({
    "invoiceInfo.invoiceNo": invoiceNo,
  });

  if(!deletedInvoice) {
    return NextResponse.json(
        {success: false, message: "Invoice not found"},
        {status: 404}
    )
  }

  return NextResponse.json({
    success: true,
    deletedInvoice,
  });
}

