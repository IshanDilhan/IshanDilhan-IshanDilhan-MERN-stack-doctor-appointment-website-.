const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  appointmentId: Number,
  appointmentDate: String,
  appointmentTime: String,
  doctorName: String,
  specificArea: String,
  patientName: String,
  age: Number, 
  gender : String,
  address: String,
  phoneNumber: String,
  email: String,
  notes: String,
  
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
