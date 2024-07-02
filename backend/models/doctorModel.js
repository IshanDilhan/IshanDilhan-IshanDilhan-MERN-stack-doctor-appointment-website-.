const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  doctorId: Number,
  doctorName: String,
  specialization: String,
  experience: Number,
  address: String,
  phoneNumber: String,
  email: String,
  imageUrl: String, 
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
