import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: "Salon" },
  customerName: { type: String, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  position: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Queue || mongoose.model("Queue", queueSchema);
