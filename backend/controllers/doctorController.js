const Doctor = require('../models/doctorModel');

const addDoctor = (req, res, next) => {
  const newDoctor = new Doctor({
    doctorId: req.body.doctorId,
    doctorName: req.body.doctorName,
    specialization: req.body.specialization,
    experience: req.body.experience,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    imageUrl: req.body.imageUrl,
  });
  newDoctor.save()
    .then((response) => {
      res.json({ response });
      //console.log(response)
    })
    .catch((error) => {
      res.json({ error });
    });
};

const getDoctors = (req, res, next) => {
  Doctor.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};
const getdoctorbyid = (req, res, next) => {
  const doctorId = req.body.doctorId
  Doctor.findOne({doctorId :doctorId })
  .then((response) => {
    if (!response) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ response });
  })
  .catch((error) => {
    res.status(500).json({ error: error.message });
  });
} 

const updateDoctor = (req, res, next) => {
  const { 
    doctorId, doctorName, specialization, experience, address, phoneNumber, email, imageUrl
  } = req.body;

  Doctor.updateOne({ doctorId }, { $set: { 
    doctorName, 
    specialization, 
    experience, 
    address, 
    phoneNumber, 
    email, 
    imageUrl
  }})
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const deleteDoctor = (req, res, next) => {
  const doctorId = req.body.doctorId; 

  Doctor.deleteOne({ doctorId })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

exports.getDoctors = getDoctors;
exports.addDoctor = addDoctor;
exports.updateDoctor = updateDoctor;
exports.deleteDoctor = deleteDoctor;
exports.getdoctorbyid =getdoctorbyid;

