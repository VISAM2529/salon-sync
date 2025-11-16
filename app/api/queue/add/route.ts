import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Queue from "@/models/Queue";
import Salon from "@/models/Salon";
import Service from "@/models/Service";
import { sendSMS, sendEmail } from "@/lib/notifications";

export async function POST(req: Request) {
  await dbConnect();
  const { salonId, customerName, serviceId, customerPhone } = await req.json();

  const count = await Queue.countDocuments({ salonId });
  const position = count + 1;

  const item = await Queue.create({
    salonId,
    customerName,
    serviceId,
    position,
  });

  // Fetch salon and service
  const [salon, service] = await Promise.all([
    Salon.findById(salonId),
    Service.findById(serviceId),
  ]);

  // Notify customer via SMS
  if (customerPhone) {
    const body = `Hi ${customerName}, you are added to the queue at ${salon?.name}. Your token: ${item._id.slice(-4)} (pos ${position}). We'll notify you when it's your turn.`;
    try {
      await sendSMS({ to: customerPhone, body });
    } catch (err) {
      console.error("SMS error:", err);
    }
  }

  // Optionally notify owner by email
  const owner = await (await import("@/models/User")).default.findById(salon?.ownerId);
  if (owner?.email) {
    try {
      await sendEmail({
        to: owner.email,
        subject: `New queue - ${customerName}`,
        html: `<p>${customerName} added to queue (pos ${position}) for ${service?.name}</p>`,
      });
    } catch (err) {
      console.error("Email error:", err);
    }
  }

  return NextResponse.json({ success: true, item });
}
