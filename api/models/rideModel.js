//import mongoose
const mongoose = require('mongoose');

//ride schema
const rideSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver"
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    startLocation:{
        latitude: Number,
        longitude: Number
    },
    endLocation:{
        latitude: Number,
        longitude: Number
    },
    price: Number,
    status: String
});

module.exports = mongoose.model("Ride", rideSchema);