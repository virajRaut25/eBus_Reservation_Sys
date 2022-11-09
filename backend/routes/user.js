const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Trip = require("../models/Trip");
const BusRoute = require("../models/BusRoute");
const Reservation = require("../models/Reservation");

const router = express.Router();

function fareCal(tKm) {
  let fare = 0;
  if (60 < tKm && tKm <= 120) {
    tKm /= 2;
    div = 2;
  } else if (120 < tKm && tKm <= 240) {
    tKm /= 4;
    div = 4;
  } else if (240 < tKm && tKm <= 360) {
    tKm /= 6;
    div = 6;
  } else if (360 < tKm && tKm <= 480) {
    tKm /= 8;
    div = 8;
  } else if (480 < tKm && tKm <= 600) {
    tKm /= 10;
    div = 10;
  }
  for (let i = 0; i < div; i++) {
    if (tKm <= 10) {
      fare += 20;
    } else if (10 < tKm && tKm <= 20) {
      fare += 25;
    } else if (20 < tKm && tKm <= 30) {
      fare += 40;
    } else if (30 < tKm && tKm <= 40) {
      fare += 45;
    } else if (40 < tKm && tKm <= 50) {
      fare += 55;
    } else if (50 > tKm && tKm <= 60) {
      fare += 60;
    }
  }
  return fare;
}

// Route 1: Make user reservation : Post "/api/user/book". Sign-in Required
router.post(
  "/book/:id",
  fetchuser,
  [
    body("boarding_point", "Boarding Point must be mentioned").notEmpty(),
    body("alighting_point", "Alighting Point must be mentioned").notEmpty(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { boarding_point, alighting_point, passenger_list } = req.body;
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
        const busRoute = await BusRoute.findById(tripDetails.route_id);
        let alighting_points = busRoute.alighting_points;
        let boarding_points = busRoute.boarding_points;
        let bKm, aKm;
        boarding_points.forEach((ele) => {
          if (ele.name === boarding_point) {
            bKm = ele.bKm;
          }
        });
        alighting_points.forEach((ele) => {
          if (ele.name === alighting_point) {
            aKm = ele.aKm;
          }
        });
        let fare = 0;
        let tKm = aKm - bKm;
        fare = fareCal(tKm);
        fare *= no_of_passengers;
        const reservation = new Reservation({
          user_id: req.user.id,
          trip_id: req.params.id,
          boarding_point,
          alighting_point,
          passenger_list,
          fare: fare,
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
    const reserve = await Reservation.find({ user_id: req.user.id });
    res.json(reserve);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
