const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightRouteSchema = new Schema({
    _id: { type: String, required: true },
    aircraft: { type: Schema.Types.ObjectId, ref: 'Aircraft', required: true }, // Referencia al avión asignado a la ruta
    origin: { type: String, required: true }, 
    destination: { type: String, required: true }, 
    distance: { type: Number, required: true }, 
    duration: { type: Number, required: true }, 
    flightNumber: { type: String, required: true }, 
    airline: { type: String, required: true },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true } // Frecuencia de vuelos
});

const FlightRouteModel = mongoose.model('flightRoute', flightRouteSchema);

module.exports = FlightRouteModel;

