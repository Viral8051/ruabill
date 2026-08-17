import dbConnect from "@/lib/mongoDb";
import Client from "@/models/Client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const clients = await Client.find({});
    return NextResponse.json({ success: true, data: clients });
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

    const client = await Client.create(body);

    return NextResponse.json({ success: true, data: client });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
