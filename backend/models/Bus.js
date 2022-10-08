const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
    busno:{
        type: String,
        unique: true,
        required: true
    },
    service_type:{
        type: String,
        required: true
    },
    no_of_seats:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('bus', BusSchema);