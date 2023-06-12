const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Trip = require("../models/Trip");
const BusRoute = require("../models/BusRoute");
const Reservation = require("../models/Reservation");

const router = express.Router();

// Route 1: Make user reservation : Post "/api/user/book". Sign-in Required
router.post(
  "/book/:id",
  fetchuser,
  [
    body("boarding_point", "Boarding Point must be mentioned").notEmpty(),
    body("alighting_point", "Alighting Point must be mentioned").notEmpty(),
    body(
      "passenger_list",
      "Atlest one Passenger reservation must be there"
    ).notEmpty(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        boarding_point,
        alighting_point,
        b_time,
        a_time,
        fare,
        passenger_list,
      } = req.body;
      let no_of_passengers = passenger_list.length;
      let tripDetails = await Trip.findById(req.params.id);
      let availability = tripDetails.availability;
      if (no_of_passengers <= availability) {
        let newAvailability = availability - passenger_list.length;
        let booked_seats_list = tripDetails.book_seats_no;
        console.log(booked_seats_list);
        passenger_list.forEach((element) => {
          booked_seats_list.push(element.seat_no);
        });

        let fare_plus_gst = fare * no_of_passengers * 1.1 + 20;
        const reservation = new Reservation({
          user_id: req.user.id,
          trip_id: req.params.id,
          boarding_point,
          b_time,
          alighting_point,
          a_time,
          passenger_list,
          fare: fare_plus_gst,
        });
        const saveReservation = await reservation.save();
        tripDetails = await Trip.findByIdAndUpdate(req.params.id, {
          $set: {
            book_seats_no: booked_seats_list,
            availability: newAvailability,
          },
        });
        res.json({ saveReservation, tripDetails });
      } else {
        return res.json(`Sorry!! Only ${availability} seats are available`);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Servel Error");
    }
  }
);

// Route 2: Get Trip Details : Post "/api/user/tripDetails". Sign-in Required
router.post(
  "/tripDetails",
  [body("id", "Trip id Must be mentioned").notEmpty()],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.body;
      let tripDetails = await Trip.findById(id);
      res.json(tripDetails);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Servel Error");
    }
  }
);

// Route 3: Get Reservation Details : Post "/api/user/reservationDetails". Sign-in Required
router.post("/reservationDetails", fetchuser, async (req, res) => {
  try {
    const reserve = await Reservation.find({ user_id: req.user.id })
      .populate({
        path: "trip_id",
        populate: {
          path: "route_id bus_id"
        },
      })
      .then(function (dbTour) {
        res.json(dbTour);
      })
      .catch(function (err) {
        res.json(err);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Cancel Reservation: Post "/api/user/cancel". Sign-in Required
router.post("/cancel/:id", fetchuser, async (req, res) => {
  try {
    let reservation = await Reservation.findById(req.params.id);
    let trip = await Trip.findById(reservation.trip_id);
    let booked_seats_list = trip.book_seats_no;
    reservation.passenger_list.forEach((passenger) => {
      if (booked_seats_list.indexOf(passenger.seat_no) !== -1) {
        booked_seats_list.splice(
          booked_seats_list.indexOf(passenger.seat_no),
          1
        );
      }
    });
    let newAvailability = trip.availability + reservation.passenger_list.length;
    trip = await Trip.findByIdAndUpdate(reservation.trip_id, {
      $set: {
        book_seats_no: booked_seats_list,
        availability: newAvailability,
      },
    });
    reservation = await Reservation.findByIdAndDelete(req.params.id);
    res.json({ Success: `Your Booking with ${reservation._id} ID is Cancelled` });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
