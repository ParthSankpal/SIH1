const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFSBucket } = require('mongoose').mongo;
// const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');

const Lawyer = require('../models/Lawyer'); // Import your Lawyer model

// Define the storage for multer
const storage = multer.memoryStorage(); // Use memory storage for files

// Initialize multer with your storage configuration
const upload = multer({ storage });

// Lawyer registration route with multiple steps
router.post('/register-lawyer', upload.single('degreeOrCertificateDocument'), async (req, res) => {
  try {
    const { name, email, password, licenseNumber, practiceName, accreditationYear, phone, step } = req.body;

    // Validate input data based on the current step
    if (step === 1 && (!name || !email || !password)) {
      return res.status(400).json({ message: 'Name, email, and password are required fields' });
    } else if (step === 2 && (!licenseNumber || !practiceName || !accreditationYear)) {
      return res.status(400).json({ message: 'License number, practice name, and accreditation year are required fields' });
    } else if (step === 3 && (!phone)) {
      return res.status(400).json({ message: 'Phone number is a required field' });
    }

    if (req.bucket) {
      const file = req.file;
      const bucket = req.bucket;

      // Create a new file in GridFS
      const uploadStream = bucket.openUploadStream('degreeOrCertificateDocument');
      uploadStream.end(file);

      // Once the upload is complete, you can get the file ID
      uploadStream.once('finish', async () => {
        // Create a lawyer document with the file ID and other fields
        const newLawyer = new Lawyer({
          name,
          email,
          password, // Store the hashed password in MongoDB
          licenseNumber,
          practiceName,
          accreditationYear,
          phone,
          services: [], // You can add services based on your implementation
          degreeOrCertificateDocument: uploadStream.id, // Store the file ID in MongoDB
        });

        // Save the lawyer document to MongoDB
        await newLawyer.save();

        // Determine the next step or if registration is complete
        const nextStep = step < 3 ? step + 1 : null;

        res.status(201).json({ message: 'Lawyer registered successfully', nextStep });
        console.log("Registration Complete");
      });
    } else {
      throw new Error('GridFSBucket not found. Make sure it is set up in your server.js.');
    }
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      // Duplicate email error (unique constraint violation)
      res.status(409).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});





// Lawyer login
router.post('/login-lawyer', async (req, res) => {
  // Handle lawyer login logic here
  const { email, password } = req.body;


  // Find the user by email and password
  Lawyer.find({ email, password })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Lawyer not found.' });
        console.log('Lawyer not found');
      } else {

        // Create a JWT token with user data (email and _id)
        // const token = jwt.sign({ email: user.email, id: user._id }, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NDgwMTI1NywiaWF0IjoxNjk0ODAxMjU3fQ.KEmMsaLO2noeNBdD6GLZ5y6sdBECB_tfb-2SITLdExE', {
        //   expiresIn: '1h', // Token expiration time (e.g., 1 hour)
        // });

      

        res.json({ message: 'Lawyer login successful.', user });
        console.log('Lawyer login successful');
      }

      
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Login failed.' });
      console.log('Login failed');
    });
});

module.exports = router;
