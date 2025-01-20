//import express
const express = require('express');

//initialize router
const router = express.Router();

//import controller
const usersController = require('../controllers/usersController');

//POST - register a new user
router.post('/signup', usersController.userSignUp);

//POST - log in an existing user
router.post('/login', usersController.userLogIn);

module.exports = router;