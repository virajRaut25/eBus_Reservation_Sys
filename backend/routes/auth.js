const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "keypin@ebusserv";
const router = express.Router();

// Route 1: Create a User using: POST "/api/auth/signup". No Sign In required
router.post(
  "/signup",
  [
    body(
      "fname",
      "Enter Valid First Name {Minimum Length should be 2}"
    ).isLength({
      min: 2,
    }),
    body(
      "lname",
      "Enter Valid Last Name {Minimum Length should be 2}"
    ).isLength({
      min: 2,
    }),
    body("email", "Enter Valid Email Id").isEmail(),
    body("mobile", "Enter Valid Mobile No.").isMobilePhone(),
    body("password", "The Mininum Length of password must be 8").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // Chech whether the user with the email exitst already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a User with this email Id already exists",
        });
      }
      user = await User.findOne({ mobile: req.body.mobile });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a User with this mobile number already registered with another email Id",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Servel Error");
    }
  }
);

// Route 2: Authenticate a User using: POST "/api/auth/signin". No Sign In required
router.post(
  "/signin",
  [
    body("email", "Enter Valid Email Id").isEmail(),
    body("password", "Please Enter the password").notEmpty(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    // Chech whether the user enters Correct credentials
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Servel Error");
    }
  }
);

// Route 3: Get loggedIn user details using: POST "/api/auth/getuser". Sign In required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      console.log(req.user);
      const user = await User.findById(userId).select("-password");
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
