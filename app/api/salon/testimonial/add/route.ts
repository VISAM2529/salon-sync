// /api/salon/testimonial/add/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/Testimonial";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const payload = await req.json();

    await Testimonial.create(payload);

    return NextResponse.json({
      success: true,
      message: "Testimonial added",
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
