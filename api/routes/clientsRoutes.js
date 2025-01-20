//import express
const express = require('express');

//initialize router
const router = express.Router();

//authorization
const auth = require('./middleware/authorization');

//import controller
const clientsController = require('../controllers/clientsController');

//access to endpoints require JSON Web Token authorization

//GET - get a client
router.get('/', auth, clientsController.clientsGetAll);

//GET - get a client by id
router.get('/:clientId', auth, clientsController.clientsGetById);

//POST - add a new client
router.post('/', auth, clientsController.clientsAdd);

//PUT - update a client
router.put('/:clientId', auth, clientsController.clientsUpdate);

//DELETE - delete a client
router.delete('/:clientId', auth, clientsController.clientsDelete);

//export router
module.exports = router;