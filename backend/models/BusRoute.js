const mongoose = require("mongoose");

const BusRouteSchema = new mongoose.Schema({
    route_id:{
        type: Number,
        unique: true,
        required: true
    },
    source:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    boarding_points:{
        type: [{name: String, bKm: Number}]
    },
    alighting_points:{
        type: [{name: String, aKm: Number}]
    }
});

module.exports = mongoose.model('bus_route', BusRouteSchema);