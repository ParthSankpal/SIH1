const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFSBucket } = require('mongoose').mongo;
const nodemailer = require('nodemailer');
// const twilio = require('twilio');

const Lawyer = require('../models/Lawyer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure nodemailer and Twilio
const emailTransporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other email services as well
  auth: {
    user: 'parth.s4878@gmail.com', 
    pass: 'tqad vcng gdgy gjbx',
  },
});

// const twilioClient = new twilio({
//   accountSid: 'ACb31b2f573550fa0d66d0a6042e97cc05',
//   authToken: '03629a569c2205aaea0381f18c10ce5a',
// });

// Handle lawyer registration and email/phone verification in a single route
router.post('/register-lawyer', upload.single('degreeOrCertificateDocument'), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      city,
      services,
      level,
    } = req.body;

    // Generate verification codes
    const emailVerificationCode = generateVerificationCode();
    // const phoneVerificationCode = generateVerificationCode();

    // Send email and SMS
    await sendVerificationEmail(email, emailVerificationCode);
    // await sendVerificationSMS(phone, phoneVerificationCode);

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
          phone,
          password, // Store the hashed password in MongoDB
          city,
          services: services, //.split(',').map((service) => service.trim()),// Split and clean services
          level,
          degreeOrCertificateDocument: uploadStream.id, // Store the file ID in MongoDB
          emailVerified: false,
          phoneVerified: false,
        });

        // Save the lawyer document to MongoDB
        await newLawyer.save();

        res.status(201).json({ message: 'Lawyer registered successfully' });
        console.log('Registration Complete');
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

// Generate a random 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//  verification email
const sendVerificationEmail = async (email, code) => {
  try {
    await emailTransporter.sendMail({
      from: 'parth.sankpal@somaiya.edu',
      to: email,
      subject: 'Email Verification Code e-वकालत',
      text: `Your email verification code is for e-वकालत : ${code}`,
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// verification SMS
const sendVerificationSMS = async (phone, code) => {
  try {
    await twilioClient.messages.create({
      body: `Your phone verification code is: ${code}`,
      from: '7020525430',
      to: phone,
    });
  } catch (error) {
    console.error('SMS sending error:', error);
    throw error;
  }
};



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
