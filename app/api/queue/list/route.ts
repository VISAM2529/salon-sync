import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Queue from "@/models/Queue";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const queue = await Queue.find({ salonId: id }).sort({ position: 1 });

  return NextResponse.json({ success: true, queue });
}
