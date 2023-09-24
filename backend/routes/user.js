const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const User = require('../models/user');


// User registration
router.post('/register', async (req, res) => {
  // Handle user registration logic here
  const { name, city, email, phone, password } = req.body;

  // Create a new user
  const newUser = new User({ name, city, email, phone, password });

  // Save the user to the database using Promises
  newUser
    .save()
    .then(() => {
      res.json({ message: 'User registration successful.' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'User registration failed.' });
    });
});

// User login
router.post('/login', async (req, res) => {
  // Handle user login logic here
  const { email, password } = req.body;

  // Find the user by email and password
  User.find({ email, password })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        console.log('user not found');
      } else {
        res.json({ message: 'User login successful.', user });
        console.log('user login successful');
        req.session.user = user;
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Login failed.' });
      console.log('login failed');
    });
});

module.exports = router;
