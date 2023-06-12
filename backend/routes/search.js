const express = require("express");
const fareCal = require("../middleware/fareCal");
const { body, validationResult } = require("express-validator");
const Trip = require("../models/Trip");
const BusRoute = require("../models/BusRoute");

const router = express.Router();

// Route 1: Get user search result using: Post "/api/search". With or Without Sign-in
router.post(
  "/",
  [
    body("source", "Source must be mentioned").notEmpty(),
    body("destination", "Destination must be mentioned").notEmpty(),
    body("trip_date", "Date of Trip must be mentioned").notEmpty(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { source, destination, trip_date } = req.body;
      let routeId = await BusRoute.find(
        {
          "boarding_points.name": source,
          "alighting_points.name": destination,
        },
        { _id: 1 }
      );
      let tripId = await Trip.find(
        {
          trip_date,
          route_id: routeId,
        },
        { _id: 1 }
      );
      await Trip.find({
        _id: tripId,
      })
        .populate(["route_id", "bus_id"])
        .then(function (dbTour) {
          res.json(dbTour);
        })
        .catch(function (err) {
          res.json(err);
        });
      // aggregate Query in mongo
      // db.trips.aggregate(
      //   [
      //     {
      //       $lookup: {
      //         from: "bus_routes",
      //         localField: "route_id",
      //         foreignField: "_id",
      //         as: "bus_routes",
      //       },
      //     },
      //     {
      //       $lookup: {
      //         from: "buses",
      //         localField: "bus_id",
      //         foreignField: "_id",
      //         as: "buses",
      //       },
      //     },
      //   ]
      // );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Servel Error");
    }
  }
);

// Route 2: Get Trip Info using: Post "/api/search/info". With or Without Sign-in
router.post(
  "/info/:id",
  [
    body("source", "Source must be mentioned").notEmpty(),
    body("destination", "Destination must be mentioned").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { source, destination } = req.body;
      let info;
      let trip = await Trip.findById(req.params.id)
        .populate(["route_id", "bus_id"])
        .then(function (dbTour) {
          info = dbTour;
        })
        .catch(function (err) {
          res.json(err);
        });
      function toHoursAndMinutes(totalMinutes) {
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
      }

      function padTo2Digits(num) {
        return num.toString().padStart(2, "0");
      }

      let dpTime = info.sd_time;
      if (dpTime >= 24) dpTime -= 24;
      dpTime = Number(dpTime.replace(":", "."));

      let boarding_points = info.route_id.boarding_points;
      let alighting_points = info.route_id.alighting_points;
      let dKm = alighting_points[alighting_points.length - 1].aKm;
      let bKm, aKm;
      boarding_points.forEach((ele) => {
        if (ele.name === source) {
          bKm = ele.bKm;
        }
      });
      alighting_points.forEach((ele) => {
        if (ele.name === destination) {
          aKm = ele.aKm;
        }
      });

      let tKm = aKm - bKm;

      let destTime = Math.round(dKm * 2);
      destTime = toHoursAndMinutes(destTime);
      destTime = Number(destTime.replace(":", "."));
      destTime += dpTime;
      if (destTime >= 24) destTime -= 24;
      destTime = destTime.toFixed(2).replace(".", ":");

      let journeyDur = Math.round(tKm * 2);
      journeyDur = toHoursAndMinutes(journeyDur);
      let bTime = Math.round(bKm * 2);
      bTime = toHoursAndMinutes(bTime);
      bTime = Number(bTime.replace(":", "."));
      bTime += dpTime;
      if (bTime >= 24) bTime -= 24;
      bTime = bTime.toFixed(2).replace(".", ":");

      let aTime = Math.round(aKm * 2);
      aTime = toHoursAndMinutes(aTime);
      aTime = Number(aTime.replace(":", "."));
      aTime += dpTime;
      if (aTime >= 24) aTime -= 24;
      aTime = aTime.toFixed(2).replace(".", ":");

      let fare = 0;
      fare = fareCal(tKm);

      res.json({
        trip_id: info._id,
        book_seats_no: info.book_seats_no,
        service_type: info.bus_id.service_type,
        source: info.route_id.source,
        sd_time: info.sd_time,
        destination: info.route_id.destination,
        destTime,
        boarding_point: source,
        bTime,
        alighting_point: destination,
        aTime,
        journeyDur,
        fare,
        tKm,
        availability: info.availability,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Servel Error");
    }
  }
);

module.exports = router;
