const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Trip = require("../models/Trip");
const BusRoute = require("../models/BusRoute");
const Bus = require("../models/Bus");

const router = express.Router();

// Route 1: Add Bus Route using: Post "/api/admin/addroute". With Sign-in
router.post(
  "/addroute",
  fetchuser,
  [
    body("route_id", "Route id must be mentioned").notEmpty(),
    body("source", "Source must be mentioned").notEmpty(),
    body("destination", "Destination must be mentioned").notEmpty(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        route_id,
        source,
        destination,
        boarding_points,
        alighting_points,
      } = req.body;
      console.log(boarding_points);
      const busRoute = new BusRoute({
        route_id,
        source,
        destination,
        boarding_points,
        alighting_points,
      });
      const saveBusRoute = await busRoute.save();
      res.json(saveBusRoute);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Servel Error");
    }
  }
);

// Route 2: Add Bus using: Post "/api/admin/addbus". With Sign-in
router.post(
  "/addbus",
  fetchuser,
  [
    body("busno", "Bus number must be mentioned").notEmpty(),
    body("service_type", "Service Type must be mentioned").notEmpty(),
    body(
      "no_of_seats",
      "Number of Seats/ Capacity of Bus must be mentioned"
    ).notEmpty(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { busno, service_type, no_of_seats } = req.body;
      const bus = new Bus({
        busno,
        service_type,
        no_of_seats,
      });
      const saveBus = await bus.save();
      res.json(saveBus);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Servel Error");
    }
  }
);

// Route 3: Add Trip using: Post "/api/admin/addtrip". With Sign-in
router.post(
  "/addtrip",
  fetchuser,
  [
    body("route_id", "Route id must be mentioned").notEmpty(),
    body("bus_id", "Bus id must be mentioned").notEmpty(),
    body("trip_date", "Date of Trip must be mentioned").notEmpty(),
    body("sd_time", "Source Departure must be mentioned").notEmpty(),
    body("availability", "Availability must be mentioned").notEmpty(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        route_id,
        bus_id,
        trip_date,
        sd_time,
        book_seats_no,
        availability
      } = req.body;
      const trip = new Trip({
        route_id,
        bus_id,
        trip_date,
        sd_time,
        book_seats_no,
        availability
      });
      const saveTrip = await trip.save();
      res.json(saveTrip);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Servel Error");
    }
  }
);

module.exports = router;
