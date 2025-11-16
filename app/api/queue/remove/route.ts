import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Queue from "@/models/Queue";
import { sendSMS } from "@/lib/notifications";

export async function POST(req: Request) {
  await dbConnect();
  const { id } = await req.json();

  // Remove the item
  const removed = await Queue.findByIdAndDelete(id);
  if (!removed) return NextResponse.json({ success: false });

  // Re-index positions: get all remaining ordered by createdAt and set positions sequentially
  const items = await Queue.find({ salonId: removed.salonId }).sort({ position: 1, createdAt: 1 });
  for (let i = 0; i < items.length; i++) {
    items[i].position = i + 1;
    await items[i].save();
  }

  // Optionally notify the first 1-2 people in queue about updated position/time
  const notifyCount = Math.min(2, items.length);
  for (let i = 0; i < notifyCount; i++) {
    try {
      const it = items[i];
      // If customerPhone stored in queue model, we can notify (if not, skip)
      if ((it as any).customerPhone) {
        await sendSMS({
          to: (it as any).customerPhone,
          body: `Hi ${(it as any).customerName}, your position at the salon is now ${it.position}. Estimated wait updated.`,
        });
      }
    } catch (err) {
      console.error("Notify error", err);
    }
  }

  return NextResponse.json({ success: true });
}
