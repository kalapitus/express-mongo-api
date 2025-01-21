//import mongoose
const mongoose = require('mongoose');

//import user model
const User = require('../models/userModel');

//import jsonwebtoken
const jwt = require('jsonwebtoken');

//import bcryptq
const bcrypt = require('bcrypt');

//register a new user with hashed password
exports.userSignUp = (req, res, next) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    //hash provided password
    bcrypt.hash(userPassword, 10, (error, encryptedPassword) => {
        if(error){
            return res.status(500).json({
                ERROR: error
            });
        }

        //create a new user with hashed password
        const newUser = new User({
            _id: new mongoose.Types.ObjectId,
            email: userEmail,
            password: encryptedPassword
        });

        //save new user in database
        newUser.save()
        .then(() => {
            res.status(201).json({
                STATUS: 'ADDED NEW USER'
            });
        })
        .catch(error => {
            res.status(500).json({
                ERROR: error
            });
        })
    })
}

//log in a registered user and return a JSON Web Token
exports.userLogIn = (req, res, next) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    //check if user with provided email exists
    User.findOne({email: userEmail})
    .then(user => {
        
        //if user doesn't exist return status - UNAUTHORIZED
        if(!user){
            return res.status(401).json({
                STATUS: 'UNAUTHORIZED'
            });
        }

        //if user exists compare provided password with the hashed password
        bcrypt.compare(userPassword, user.password, (error, result) => {

            //handle bcrypt errors
            if(error) return res.status(500).json({
                ERROR: error
            });

            //if password is incorrect return status - UNAUTHORIZED
            if(!result) return res.status(401).json({
                STATUS: "WRONG PASSWORD"
            });

            //if password is correct generate JSON Web Token
            const token = jwt.sign(
                {
                user: user.id,
                email: user.email
                },
                process.env.JWT_KEY,
                { expiresIn: "1d" }
            );

            //return generated JSON Web Token
            return res.status(200).json({
                STATUS: 'LOGIN SUCCESSFUL',
                token: token
            });
        })
    })
}

