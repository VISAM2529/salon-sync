import mongoose from "mongoose";

const salonSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  slug: { type: String, unique: true }, // subdomain
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Salon || mongoose.model("Salon", salonSchema);
