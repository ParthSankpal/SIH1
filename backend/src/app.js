const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://parthsankpal:0aeNyk9eD9JbroCz@cluster0.3z4hvkn.mongodb.net/';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

// Create a base User schema with common fields
const UserSchema = new mongoose.Schema({
  name: String,
  city: String,
  email: String,
  phone: String,
  password: String,
});

// Create User discriminator model
const User = mongoose.model('User', UserSchema);

// Create Lawyer discriminator model with additional fields
const Lawyer = User.discriminator('Lawyer', new mongoose.Schema({
  level: String,
  services: [String],
  degreeOrCertificateDocument: String,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML form
app.use(express.static('public'));

// Handle user registration
app.post('/register', (req, res) => {
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

// Handle lawyer registration
app.post('/register-lawyer', (req, res) => {
  const { name, city, email, phone, password, level, services, degreeOrCertificateDocument } = req.body;

  // Create a new lawyer user
  const newLawyer = new Lawyer({
    name,
    city,
    email,
    phone,
    password,
    level,
    services: services.split(','), // Split services into an array
    degreeOrCertificateDocument,
  });

  // Save the lawyer user to the database using Promises
  newLawyer
    .save()
    .then(() => {
      res.json({ message: 'Lawyer registration successful.' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Lawyer registration failed.' });
    });
});




// Handle user login
app.post('/login', (req, res) => {
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

// Handle lawyer login
app.post('/login-lawyer', (req, res) => {
  const { email, password } = req.body;

  // Find the lawyer by email and password
  Lawyer.find({ email, password })
  .then((lawyer) => {
    if (!lawyer) {
      res.status(404).json({ message: 'Lawyer not found.' });
      console.log('Lawyer not found.');
    } else {
      res.json({ message: 'Lawyer login successful.', lawyer });
      console.log('Lawyer login successful.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Login failed.' });
    console.log('Login failed.');
  });

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
