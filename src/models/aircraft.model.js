const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aircraftSchema = new Schema({
    model: { type: String, required: true },
    airlineId: { type: String, required: true, unique: true },
    manufactureYear: { type: Number, required: true },
    passengerCapacity: { type: Number, required: true },
    cargoCapacity: { type: Number, required: true },
    status: { type: String, enum: ['active', 'maintenance', 'retired'], required: true }
})

const AircraftModel = mongoose.model('aircraft', aircraftSchema);

module.exports = AircraftModel;

