//import mongoose
const mongoose = require('mongoose');

//client schema
const clientSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    surname: String,
    email: String,
    phoneNumber: String,
    location:{
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model("Client", clientSchema);