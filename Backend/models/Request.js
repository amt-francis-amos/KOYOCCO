const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    serviceType: { type: String, enum: ['Airport Pickup', 'Relocation'], required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Request', requestSchema);
