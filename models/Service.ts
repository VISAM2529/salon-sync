import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: "Salon" },
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // minutes
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
