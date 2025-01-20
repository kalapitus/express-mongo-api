//import express
const express = require('express');

//initialize router
const router = express.Router();

//authorization
const auth = require('./middleware/authorization');

//import controller
const ridesController = require('../controllers/ridesController');

//access to endpoints require JSON Web Token authorization

//GET - get a ride
router.get('/', auth, ridesController.ridesGetAll);

//GET - get a ride by id
router.get('/:rideId', auth, ridesController.ridesGetById);

//POST - add a new ride
router.post('/', auth, ridesController.ridesAdd);

//PUT - update a ride
router.put('/:rideId', auth, ridesController.ridesUpdate);

//DELETE - delete a ride
router.delete('/:rideId', auth, ridesController.ridesDelete);

//export router
module.exports = router;