import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    // Here you would typically save the contact message to your database
    // or send it via email to your support team.
    return NextResponse.json({ success: true, message: "Contact message received. We'll get back to you shortly." });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  } 
}