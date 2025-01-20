//import mongoose
const mongoose = require('mongoose');

//import client model
const Client = require('../routes/models/clientModel');

//get all clients
exports.clientsGetAll = (req, res, next) => {
    Client.find()
    .then(clients => {
        res.status(200).json({
            STATUS: 'ALL CLIENTS',
            clients: clients
        });
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
}

//get client by id
exports.clientsGetById = (req, res, next) => {
    const clientId = req.params.clientId;

    Client.findById(clientId)
    .then(client => {
        if(client){
            res.status(200).json({
                STATUS: `CLIENT WITH ID: ${clientId}`,
                client: client
            });
        }
        else{
            res.status(404).json({
                STATUS: `CLIENT WITH ID: ${clientId} WAS NOT FOUND`
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
};

//add a new client
exports.clientsAdd = (req, res, next) =>{
    const newClient = new Client({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        location:{
            latitude: req.body.location.latitude,
            longitude: req.body.location.longitude
        }
    });

    newClient.save()
    .then(client => {
        res.status(201).json({
            STATUS: 'ADDED NEW CLIENT',
            client: client
        });
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
}

//update a client
exports.clientsUpdate = (req, res, next) =>{
    const clientId = req.params.clientId;
    const updatedFields = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        location:{
            latitude: req.body.location.latitude,
            longitude: req.body.location.longitude
        }
    };

    //update a client and receive an updated client
    Client.findByIdAndUpdate(clientId, updatedFields, {new: true})
    .then(client => {
        if(client){
            res.status(200).json({
                STATUS: `CLIENT WITH ID: ${clientId} WAS UPDATED`,
                updatedClient: client
            });
        }
        else{
            res.status(404).json({
                STATUS: `CLIENT WITH ID: ${clientId} WAS NOT FOUND`
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
}

//delete a client
exports.clientsDelete = (req, res, next) => {
    const clientId = req.params.clientId;

    Client.findByIdAndDelete(clientId)
    .then(result => {
        if(result){
            res.status(200).json({
                STATUS: `CLIENT WITH ID: ${clientId} WAS DELETED`
            });
        }
        else{
            res.status(404).json({
                STATUS: `CLIENT WITH ID: ${clientId} WAS NOT FOUND`
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            ERROR: error
        });
    })
}