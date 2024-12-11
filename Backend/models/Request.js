const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    serviceType: { type: String, required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
});

module.exports = mongoose.model('Request', requestSchema);
