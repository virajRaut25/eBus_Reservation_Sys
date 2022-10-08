const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trip",
  },
  boarding_point: {
    type: String,
    required: true,
  },
  alighting_point: {
    type: String,
    required: true,
  },
  passenger_list: {
    type: [
      {
        name: { type: String },
        gender: { type: String },
        age: { type: Number },
        seat_no: { type: Number },
      },
    ],
  },
  fare: {
    type: Number,
  },
});

module.exports = mongoose.model("reservation", ReservationSchema);
