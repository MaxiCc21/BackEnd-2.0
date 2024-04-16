const mongoose = require('mongoose');

const destinationsSchema = new mongoose.Schema({
    province: { 
        type: String, 
        required: true 
    },
    airport: {
        type: String,
        required: true 
    },
    nickname: {
        type: String,
        required: true, 
        unique: true 
    },
    country: { 
        type: String,
        default:"Argentina"
    },
})





const DestinationsModel = mongoose.model('destinations', destinationsSchema);

module.exports = DestinationsModel;
