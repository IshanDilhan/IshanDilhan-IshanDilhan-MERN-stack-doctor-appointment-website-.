const Appointment = require("../models/model");

const addAppoinment = (req, res, next) => {
  const newAppointment = new Appointment({
    appointmentId: req.body.appointmentId,
    appointmentDate: req.body.appointmentDate,
    appointmentTime: req.body.appointmentTime,
    doctorName: req.body.doctorName,
    specificArea: req.body.specificArea,
    patientName: req.body.patientName,
    age: req.body.age,
    gender: req.body.gender,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    notes: req.body.notes,
  });
  newAppointment.save()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const getAppoinment = (req, res, next) => {
    Appointment.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};
const getAppointmentById = (req, res, next) => {
  const { appointmentId } = req.body; // Extract appointmentId from request body

  Appointment.findOne({ appointmentId : appointmentId }) // Adjust field name as per your schema
    .then((response) => {
      if (!response) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json({ response });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};


const getlastAppointment = (req, res, next) => {
  Appointment.find()
  .sort({ appointmentId: -1 }) // Sort in descending order based on _id to get the latest appointment first
  .limit(1) // Limit the result to only the first document
  .then((appointments) => {
      if (appointments.length > 0) {
          const lastAppointmentId = appointments[0].appointmentId; // Assuming _id is your appointment ID field
          res.json({ lastAppointmentId });
      } else {
          res.json({ lastAppointmentId: null }); // Handle case where no appointments are found
      }
  })
  .catch((error) => {
      res.status(500).json({ error: error.message }); // Handle errors
  });
};


const updateAppoinment = (req, res, next) => {
    const { 
        appointmentId, appointmentDate,  appointmentTime, doctorName, specificArea, patientName,  age,  gender, address, phoneNumber, email, 
        notes   } = req.body;
    // that same for this(object distructuring)
    // const id = req.body.id;
    // const name =req.body.name;

    Appointment.updateOne({ appointmentId: appointmentId }, { $set: { appointmentDate,appointmentTime, doctorName,specificArea,patientName,age,
        gender,address, phoneNumber,email,notes
      }})
      .then((response) => {

        res.json({ response }
          
        );
      })
      .catch((error) => {
        console.log(error)
        res.json({ error });
      });
  };

  const deleteAppoinment = (req, res, next) => {
    const appointmentId = req.body.appointmentId; 
    //console.log(appointmentId);
    Appointment.deleteOne({ appointmentId: appointmentId })
      .then((response) => {
        res.json({ response });
       // console.log(response);

      })
      .catch((error) => {
        res.json({ error });
        console.log("error");
      });
  };


exports.getAppoinment = getAppoinment;
exports.addAppoinment = addAppoinment;
exports.updateAppoinment = updateAppoinment;
exports.deleteAppoinment = deleteAppoinment;
exports.getlastAppointment = getlastAppointment;
exports.getAppointmentById=getAppointmentById;
