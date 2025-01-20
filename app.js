//initialize environment variables
require('dotenv').config();

//import express
const express = require('express');

//initialize express
const app = express();

//database connection (MongoDB Atlas)
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7uq4e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=cluster0`)

//import and initialize logger (morgan)
const morgan = require('morgan');
app.use(morgan('dev'));

//import and initialize body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json())

//import routes
const clientsRoutes = require('./api/routes/clientsRoutes');
const driverRoutes = require('./api/routes/driversRoutes');
const ridesRoutes = require('./api/routes/ridesRoutes');
const usersRoutes = require('./api/routes/usersRoutes');

//use routes
app.use('/api/clients', clientsRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/rides', ridesRoutes);
app.use('/auth', usersRoutes);

//handle undefined endpoints
app.use((req,res, next) => {
    res.status(404).json({
        STATUS: "NOT FOUND"
    })
});

module.exports = app;