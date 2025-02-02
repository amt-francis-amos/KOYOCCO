const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },  
  agentId: { type: String },
  profileImage: { type: String }, 
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
