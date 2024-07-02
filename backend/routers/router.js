const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const controller1 = require('../controllers/doctorController');
const adminController = require('../controllers/adminController');
const loginController = require('../controllers/Login');

router.get('/getAppoinment', controller.getAppoinment);
router.post('/addAppoinment', controller.addAppoinment);
router.post('/updateAppoinment', controller.updateAppoinment);
router.post('/deleteAppoinment', controller.deleteAppoinment);
router.get('/getlastAppointment', controller.getlastAppointment);
router.post('/getAppointmentById', controller.getAppointmentById);



router.get('/getDoctors', controller1.getDoctors);
router.post('/addDoctor', controller1.addDoctor);
router.post('/updateDoctor', controller1.updateDoctor);
router.post('/deleteDoctor', controller1.deleteDoctor);
router.post('/getdoctorbyid', controller1.getdoctorbyid);



router.get('/getAdmins', adminController.getAdmins);
router.post('/addAdmin', adminController.addAdmin);
router.post('/updateAdmin', adminController.updateAdmin);
router.post('/deleteAdmin', adminController.deleteAdmin);

router.post('/login', loginController.loguser);
router.get('/protected-route', loginController.verifyToken, (req, res) => { res.json({ message: 'You have access to this protected route', user: req.user });
  });


module.exports = router;
