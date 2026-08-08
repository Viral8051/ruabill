import dbConnect from "@/lib/mongoDb";
import Invoice from "@/models/Invoice";
import { generateInvoiceNo } from "@/lib/generateInvoiceNo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const invoices = await Invoice.find({});
    return NextResponse.json({ success: true, data: invoices });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // server-side generate karo, frontend value ignore karo
    const invoiceNo = await generateInvoiceNo();

    const invoice = await Invoice.create({
      ...body,
      invoiceInfo: {
        ...body.invoiceInfo,
        invoiceNo,
      },
    });

    return NextResponse.json({ success: true, data: invoice });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}