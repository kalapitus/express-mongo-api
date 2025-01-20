//import express
const express = require('express');

//initialize router
const router = express.Router();

//authorization
const auth = require('./middleware/authorization');

//import controller
const driversController = require('../controllers/driversController');

//access to endpoints require JSON Web Token authorization

//GET - get a driver
router.get('/', auth, driversController.driversGetAll);

//GET - get a driver by id
router.get('/:driverId', auth, driversController.driversGetById);

//POST - add a new driver
router.post('/', auth, driversController.driversAdd);

//PUT - update a driver
router.put('/:driverId', auth, driversController.driversUpdate);

//DELETE - delete a driver
router.delete('/:driverId', auth, driversController.driversDelete);

//export router
module.exports = router;