const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');

const Lawyer = require('../models/Lawyer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure nodemailer
const emailTransporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other email services as well
  auth: {
    user: 'parth.s4878@gmail.com',
    pass: 'tqad vcng gdgy gjbx',
  },
});

// Generate a random 6-digit verification code
let emailVerificationCode; 
const generateVerificationCode = () => {
  emailVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  return emailVerificationCode;
};

// Send verification email
const sendVerificationEmail = async (email) => {
  try {
    // Generate the verification code and store it in the variable
    generateVerificationCode();

    await emailTransporter.sendMail({
      from: 'parth.sankpal@somaiya.edu',
      to: email,
      subject: 'Email Verification Code e-वकालत',
      text: `Your email verification code is for e-वकालत : ${emailVerificationCode}`,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};


router.post('/send-verification-code', async (req, res) => {
  try {
    const { email } = req.body;

    // Send verification email
    await sendVerificationEmail(email);

    res.status(200).json({ message: 'Email verification code sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { email, emailCode } = req.body;

    if (emailVerificationCode === emailCode) {
      // Send a success response if verification is successful
      return res.status(200).json({ message: 'Verification successful', verified: true });
    } else {
      // Handle the case where the provided codes do not match
      return res.status(400).json({ message: 'Verification codes do not match' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


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
          services: services.split(',').map((service) => service.trim()), // Split and clean services
          level,
          degreeOrCertificateDocument: uploadStream.id, // Store the file ID in MongoDB
          emailVerified: true,
          phoneVerified: true,
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
