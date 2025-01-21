//import mongoose
const mongoose = require('mongoose');

//driver schema
const driverSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    surname: String,
    email: String,
    phoneNumber: String,
    car: {
        brand: String,
        model: String,
        registrationPlate: String
    },
    location:{
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model("Driver", driverSchema);