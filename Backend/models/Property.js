const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100, 
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      maxlength: 255, 
    },
    condition: {
      type: String,
      required: true,
      enum: ["Newly Built", "Fairly Used", "Renovated"], 
    },
    region: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ["Short-Stay", "PropertySales", "PropertyRentals"], 
    },
    address: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [], 
    },
    video: {
      type: String,
    },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  },
  {
    timestamps: true, 
  }
);


propertySchema.index({ region: 1 });

module.exports = mongoose.model("Property", propertySchema);
