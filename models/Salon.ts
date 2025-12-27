import mongoose from "mongoose";

const salonSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  slug: { type: String, unique: true }, // subdomain
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  createdAt: { type: Date, default: Date.now },
  // NEW FIELDS FOR PUBLIC PAGE
  about: {
    type: String,
    default: "We provide premium salon services."
  },
  yearsExperience: { type: Number, default: 1 },
  clientsCount: { type: Number, default: 0 },
  staffCount: { type: Number, default: 1 },
  rating: { type: Number, default: 4.5 },

  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },

  socials: {
    instagram: String,
    facebook: String,
    twitter: String,
  },

  mainImage: String, // Main salon image
  gallery: [String], // array of image URLs

});

export default mongoose.models.Salon || mongoose.model("Salon", salonSchema);
