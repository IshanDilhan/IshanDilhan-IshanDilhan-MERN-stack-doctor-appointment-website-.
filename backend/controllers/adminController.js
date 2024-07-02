const Admin = require('../models/adminModel');

const addAdmin = (req, res, next) => {
  const newAdmin = new Admin({
    adminId: req.body.adminId,
    username: req.body.username,
    password: req.body.password,
  });
  newAdmin.save()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const getAdmins = (req, res, next) => {
  Admin.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};


const getAdminById = (req, res, next) => {
  const { adminId } = req.body;
  Admin.findOne({adminId:adminId})
  .then((response) => {
    if (!response) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json({ response });
    //console.log(response);
  })
  .catch((error) => {
    res.status(500).json({ error: error.message });
  });
};

const updateAdmin = (req, res, next) => {
  const { adminId, username, password } = req.body;

  Admin.updateOne({ adminId }, { $set: { username, password }})
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const deleteAdmin = (req, res, next) => {
  const adminId = req.body.adminId; 
  Admin.deleteOne({ adminId })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

exports.getAdmins = getAdmins;
exports.addAdmin = addAdmin;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;
exports.getAdminById = getAdminById;
