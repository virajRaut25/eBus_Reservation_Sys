const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    mobile:{
        type: String,
        unique: true,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', UserSchema);