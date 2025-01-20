//import mongoose
const mongoose = require('mongoose');

//import ride model
const Ride = require('../routes/models/rideModel');

//get all rides
exports.ridesGetAll = (req, res, next) => {
    Ride.find()
    .populate("driver", "name surname phoneNumber car")
    .populate("client", "name surname phoneNumber")
    .then(rides => {
        res.status(200).json({
            STATUS: 'ALL RIDES',
            rides: rides
        });
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
};

//get ride by id
exports.ridesGetById = (req, res, next) => {
    const rideId = req.params.rideId;

    Ride.findById(rideId)
    .populate("driver", "name surname phoneNumber car")
    .populate("client", "name surname phoneNumber")
    .then(ride => {
        res.status(200).json({
            STATUS: `RIDE WITH ID: ${rideId}`,
            ride: ride
        });
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    });
};

//add a new ride
exports.ridesAdd = (req, res, next) => {
    const newRide = new Ride({
        _id: new mongoose.Types.ObjectId(),
        driver: req.body.driverId,
        client: req.body.clientId,
        startLocation:{
            latitude: req.body.startLocation.latitude,
            longitude: req.body.startLocation.longitude,
        },
        endLocation:{
            latitude: req.body.endLocation.latitude,
            longitude: req.body.endLocation.longitude,
        },
        price: req.body.price,
        status: req.body.status
    });

    newRide.save()
    .then(ride => {
        res.status(201).json({
            STATUS: 'ADDED NEW RIDE',
            ride: ride
        });
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
};

//update a ride
exports.ridesUpdate = (req, res, next) => {
    const rideId = req.params.rideId;

    const updatedFields = {
        driver: req.body.driverId,
        client: req.body.clientId,
        startLocation:{
            latitude: req.body.startLocation.latitude,
            longitude: req.body.startLocation.longitude,
        },
        endLocation:{
            latitude: req.body.endLocation.latitude,
            longitude: req.body.endLocation.longitude,
        },
        price: req.body.price,
        status: req.body.status
    };

    //update a ride and receive an updated ride
    Ride.findByIdAndUpdate(rideId, updatedFields, {new: true})
    .then(ride => {
        if(ride){
            res.status(200).json({
                STATUS: `RIDE WITH ID: ${rideId} WAS UPDATED`,
                updatedRide: ride
            });
        }
        else{
            res.status(400).json({
                STATUS: `RIDE WITH ID: ${rideId} WAS NOT FOUND`
            });
        }
    })
    .catch(error =>{
        res.status(500).json({
            ERROR: error
        })
    })
};

//delete a ride
exports.ridesDelete = (req, res, next) => {
    const rideId = req.params.rideId;

    Ride.findByIdAndDelete(rideId)
    .then(result => {
        if(result){
            res.status(200).json({
                STATUS: `RIDE WITH ID: ${rideId} WAS DELETED`
            });
        }
        else{
            res.status(404).json({
                STATUS: `RIDE WITH ID: ${rideId} WAS NOT FOUND`
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
}