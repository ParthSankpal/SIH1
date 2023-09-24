const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const lawyerRoutes = require('./routes/lawyer');
const multer = require("multer");
const { GridFSBucket } = mongoose.mongo;

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the actual URL of your frontend
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://parthsankpal:0aeNyk9eD9JbroCz@cluster0.3z4hvkn.mongodb.net/mydatabase';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection; // Get the mongoose connection object

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  
  // Initialize the GridFSBucket here, after the database connection is established
  const bucket = new GridFSBucket(db.db, {
    bucketName: "newBucket"
  });

  // Pass the 'bucket' object to the routes
  app.use((req, res, next) => {
    req.bucket = bucket; // Add this line to make the 'bucket' object available in the routes
    next();
  });

  // Include your routes after setting up the 'bucket' object
  app.use('/api/user', userRoutes);
  app.use('/api/lawyer', lawyerRoutes); // Use the lawyer routes

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
