const express = require("express");
const fareCal = require("../middleware/fareCal");
const { body, validationResult } = require("express-validator");
const Trip = require("../models/Trip");
const BusRoute = require("../models/BusRoute");

const router = express.Router();

// Route 1: Get user search result using: Get "/api/search". With or Without Sign-in
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
      const busRoute = await BusRoute.findById(routeId);
      let alighting_points = busRoute.alighting_points;
      let boarding_points = busRoute.boarding_points;
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
      let fare = 0;
      let tKm = aKm - bKm;
      fare = fareCal(tKm);
      console.log(fare);
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
          res.json({ dbTour, fare });
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

module.exports = router;
