const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = 'ACb31b2f573550fa0d66d0a6042e97cc05';
const authToken = '7bf1a3d09045033b2364aab744932871';
const client = require('twilio')(accountSid, authToken);
const { MessagingResponse } = require('twilio').twiml;

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
let phoneVerificationCode;
const generateVerificationCode = () => {
  emailVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  phoneVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  return {
    emailVerificationCode,
    phoneVerificationCode,
  };
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
      text: `Your email verification code is for e-वकालत : ${ generateVerificationCode().emailVerificationCode}`,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

//send mobile varification code
// const sendphoneVerificationCode = async (phone) => {
//   // try {
//   //   // Generate the verification code
//   //   const phoneVerificationCode = generateVerificationCode().phoneVerificationCode;

//   //   // Send SMS using Twilio
//   //   const message = await client.messages.create({
//   //     body: `Your phone verification code is for e-वकालत: ${phoneVerificationCode}`,
//   //     from: '+15109624116', // Your Twilio phone number
//   //     to: phone,
//   //   });

//   //   console.log('SMS sent with SID:', message.sid);
//   // } catch (error) {
//   //   console.error('SMS sending error:', error);
//   //   throw error;
//   // }
//   const twiml = new MessagingResponse();

//   twiml.message(`Your phone verification code is for e-वकालत: ${phoneVerificationCode}`);

//   res.type('text/xml').send(twiml.toString());
// };

// Send mobile verification code
const sendphoneVerificationCode = async (phone) => {
  try {
    // Generate the verification code
    const phoneVerificationCode = generateVerificationCode().phoneVerificationCode;

    // Send SMS using Twilio
    const message = await client.messages.create({
      body: `Your phone verification code is for e-वकालत: ${phoneVerificationCode}`,
      from: +15109624116, // Twilio phone number
      to: "+91"+ phone,
    });

    console.log('SMS sent with SID:', message.sid);

    return phoneVerificationCode;
  } catch (error) {
    console.error('SMS sending error:', error);
    throw error;
  }
};


router.post('/send-verification-code', async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Send verification email and get email verification code
    const emailVerificationCode = await sendVerificationEmail(email);

    // Send mobile verification code and get phone verification code
    const phoneVerificationCode = await sendphoneVerificationCode(phone);

    // Only send a JSON response if everything is successful
    res.status(200).json({
      message: 'Email and SMS verification codes sent successfully',
      emailVerificationCode,
      phoneVerificationCode,
    });
  } catch (error) {
    console.error(error);

    // Handle errors and send an appropriate response
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { email, emailCode, phoneCode } = req.body;

    if (emailVerificationCode === emailCode && phoneVerificationCode == phoneCode) {
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
