const mongoose = require("mongoose");
const BusRoute = require("../models/BusRoute");

const TripSchema = new mongoose.Schema({
  route_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bus_route",
  },
  bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bus",
  },
  trip_date: {
    type: Date,
    required: true,
    trim: true,
  },
  sd_time: {
    type: String,
    required: true,
  },
  book_seats_no: {
    type: [Number],
  },
  availability: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("trip", TripSchema);
