const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lawyerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // licenseNumber: {
  //   type: String,
  //   required: true,
  // },
  // practiceName: {
  //   type: String,
  //   required: true,
  // },
  // accreditationYear: {
  //   type: String,
  //   required: true,
  // },
  phone: {
    type: String,
    required: true,
  },
  services: {
    type: [String], //  can adjust this based on your implementation
  },
  degreeOrCertificateDocument: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GridFSFile', // Reference to the GridFS file
  },
});

const Lawyer = mongoose.model('Lawyer', lawyerSchema);

module.exports = Lawyer;
