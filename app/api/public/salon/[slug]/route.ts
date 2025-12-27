// /api/public/salon/[slug]/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Salon from "@/models/Salon";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import Offer from "@/models/Offer";

export async function GET(req: Request, { params }: any) {
  try {
    await dbConnect();
    const { slug } = await params;
    const salon = await Salon.findOne({ slug }).lean();
    if (!salon) {
      return NextResponse.json({
        success: false,
        message: "Salon not found",
      });
    }

    const services = await Service.find({ salonId: salon._id }).lean();
    const testimonials = await Testimonial.find({ salonId: salon._id }).lean();
    const offers = await Offer.find({ salonId: salon._id, isActive: true }).lean();

    return NextResponse.json({
      success: true,
      salon,
      services,
      testimonials,
      offers,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
