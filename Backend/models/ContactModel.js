const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  customerName: {type: String,required: true,trim: true,},
  customerEmail: {type: String,required: true,trim: true,match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,"Please use a valid email address.",],},
  message: {type: String,required: true,trim: true,},
  propertyId: {type: mongoose.Schema.Types.ObjectId,required: true,ref: "Property",},
  agentId: { type: mongoose.Schema.Types.ObjectId,required: true,ref: "Agent",},createdAt: {type: Date,default: Date.now,},});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
