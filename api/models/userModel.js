//import mongoose
const mongoose = require('mongoose');

//user schema
const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);