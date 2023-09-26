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
  phone: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
  },
  degreeOrCertificateDocument: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GridFSFile',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
});

const Lawyer = mongoose.model('Lawyer', lawyerSchema);

module.exports = Lawyer;
