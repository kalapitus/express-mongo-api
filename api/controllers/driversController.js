//import mongoose
const mongoose = require('mongoose');

//import driver model
const Driver = require('../routes/models/driverModel');

//get all drivers
exports.driversGetAll = (req, res, next) => {
    Driver.find()
    .then(drivers => {
        res.status(200).json({
            STATUS: 'ALL DRIVERS',
            drivers: drivers
        });
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
}

//get driver by id
exports.driversGetById = (req, res, next) => {
    const driverId = req.params.driverId;

    Driver.findById(driverId)
    .then(driver => {
        if(driver){
            res.status(200).json({
                STATUS: `DRIVER WITH ID: ${driverId}`,
                driver: driver
            });
        }
        else{
            res.status(404).json({
                STATUS: `DRIVER WITH ID: ${driverId} WAS NOT FOUND`
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
}

//add a new driver
exports.driversAdd = (req, res, next) =>{
    const newDriver = new Driver({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        car: {
            brand: req.body.car.brand,
            model: req.body.car.model,
            registrationPlate: req.body.car.registrationPlate
        },
        location:{
            latitude: req.body.location.latitude,
            longitude: req.body.location.longitude
        }
    });

    newDriver.save()
    .then(driver => {
        res.status(201).json({
            STATUS: 'ADDED NEW DRIVER',
            driver: driver
        });
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
};

//update a driver
exports.driversUpdate = (req, res, next) =>{
    const driverId = req.params.driverId;
    
    const updatedFields = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        car: {
            brand: req.body.car.brand,
            model: req.body.car.model,
            registrationPlate: req.body.car.registrationPlate
        },
        location:{
            latitude: req.body.location.latitude,
            longitude: req.body.location.longitude
        }
    };

    //update a driver and receive an updated driver
    Driver.findByIdAndUpdate(driverId, updatedFields, {new: true})
    .then(driver => {
        if(driver){
            res.status(200).json({
                STATUS: `DRIVER WITH ID: ${driverId} WAS UPDATED`,
                updatedDriver: driver
            });
        }
        else{
            res.status(404).json({
                STATUS: `DRIVER WITH ID: ${driverId} WAS NOT FOUND`
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
}

//delete a driver
exports.driversDelete = (req, res, next) => {
    const driverId = req.params.driverId;

    Driver.findByIdAndDelete(driverId)
    .then(result => {
        if(result){
            res.status(200).json({
                STATUS: `DRIVER WITH ID: ${driverId} WAS DELETED`
            });
        }
        else{
            res.status(404).json({
                STATUS: `DRIVER WITH ID: ${driverId} WAS NOT FOUND`
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
}