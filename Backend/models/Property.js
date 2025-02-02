const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  condition: { type: String, required: true, enum: ["Newly Built", "Fairly Used", "Innovated"] },
  region: { type: String, required: true },
  propertyType: { type: String, required: true, enum: ["Short-Stay", "PropertySales", "PropertyRentals"] },
  address: { type: String, required: true },
  images: { type: [String], default: [] },
  video: { type: String },
  status: { type: String, enum: ["available", "sold"], default: "available" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  companyLogo: { type: String, default: "https://res.cloudinary.com/dkvs0lnab/image/upload/koyocco-logo.jpeg" }, 
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);


