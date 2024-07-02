const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const verifyToken = require("../middleware/authMiddeware"); // Adjust the path as per your project structure

// Function to retrieve admin by adminId
const getAdminById = (adminId) => {
  return Admin.findOne({ adminId: adminId });
};

// Function to verify username and password, and generate JWT if valid
const loguser = (req, res, next) => {
  const { adminId, username, password } = req.body;

  // Find admin by adminId (assuming adminId is unique)
  getAdminById(adminId)
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      // Check if passwords match (insecure method, use bcrypt in production)
      if (password !== admin.password) {
        return res
          .status(401)
          .json({ error: "Authentication password failed" });
      }
      if (username !== admin.username) {
        return res
          .status(401)
          .json({ error: "Authentication username failed" });
      }

      // Passwords match, generate JWT token
      const token = jwt.sign(
        {
          adminId: admin.adminId,
          username: admin.username,
        },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: "10h"
        }
      );

      // Return JWT token in response
      res.json({
        message: "Authentication successful",
        token: token,
      });
      
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = {loguser,verifyToken};
