import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Salon from "@/models/Salon";
import Service from "@/models/Service";

export async function GET(req: Request, { params }: any) {
  await dbConnect();

  // 🔥 FIX: params is a Promise → must await it
  const { slug } = await params;

  console.log("Fetching salon with slug:", slug);

  const salon = await Salon.findOne({ slug });
  if (!salon) {
    return NextResponse.json({ success: false, message: "Salon not found" });
  }

  const services = await Service.find({ salonId: salon._id });

  return NextResponse.json({
    success: true,
    salon,
    services,
  });
}
