const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightRouteSchema = new Schema({
    aircraftId: { type: Array,  required: true }, 
    origin: { type: String, required: true }, 
    destination: { type: String, required: true }, 
    distance: { type: Number, required: true }, 
    duration: { type: Number, required: true }, 
    flightNumber: { type: String, required: true }, 
    airline: { type: String, required: true },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true } // Frecuencia de vuelos
});

const flightRouteModel = mongoose.model('flightRoute', flightRouteSchema);

module.exports = flightRouteModel;

