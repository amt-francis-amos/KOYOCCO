const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
