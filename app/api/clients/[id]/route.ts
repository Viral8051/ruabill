import dbConnect from "@/lib/mongoDb";
import Client from "@/models/Client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await dbConnect();

  const deletedClient = await Client.findByIdAndDelete(id);

  if (!deletedClient) {
    return NextResponse.json(
      { success: false, message: "Client not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    deletedClient,
  });
}
