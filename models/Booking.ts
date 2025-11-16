import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: "Salon" },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  customerName: { type: String, required: true },
  customerPhone: { type: String },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["upcoming", "completed", "cancelled"],
    default: "upcoming"
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
