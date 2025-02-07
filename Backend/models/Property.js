const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    condition: { 
      type: String, 
      required: true, 
      enum: ["Newly built", "Fairly Used", "Renovated", "Virgin Land", "Old House"] 
    },
    region: { type: String, required: true },
    propertyType: { 
      type: String, 
      required: true, 
      enum: ["Short-Stay", "PropertySales", "PropertyRentals"] 
    },
    address: { type: String, required: true },
    images: { type: [String], default: [] },
    video: { type: String },
    status: { type: String, enum: ["available", "sold"], default: "available" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyLogo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
