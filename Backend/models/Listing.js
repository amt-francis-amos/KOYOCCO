// models/Listing.js
const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    photos: [{ type: String, required: true }], 
    video: { type: String, required: true }, 
    isPropertyOwner: { type: Boolean, required: true },
    promotionFeePaid: { type: Boolean, default: false },
    agentSubscription: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
