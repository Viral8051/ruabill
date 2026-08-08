// app/api/invoices/next-number/route.ts
import dbConnect from "@/lib/mongoDb";
import { generateInvoiceNo } from "@/lib/generateInvoiceNo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const invoiceNo = await generateInvoiceNo();
    return NextResponse.json({ success: true, invoiceNo });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}