import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: "Salon", required: true },
  customerName: { type: String, required: true },

  // MULTIPLE SERVICES
  serviceIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Service" }
  ],

  // For old compatibility
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },

  position: { type: Number, required: true },

  estimatedMinutes: { type: Number }, // NEW

  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Queue ||
  mongoose.model("Queue", queueSchema);
