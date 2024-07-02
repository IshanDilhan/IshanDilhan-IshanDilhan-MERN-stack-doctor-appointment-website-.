const express = require("express");
const app = express();
const cors = require("cors");
//const app = require('./app'); no need
const port = 3001;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./routers/router');
const multer = require('multer'); //for file upload
const path = require('path') //for file upload
app.use(express.static('public'));
require('dotenv').config();
app.use(cors()); // to access cross origin resouce policy
app.use(express.json());

//file upoad
// Define storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname+ "_"+ Date.now() + path.extname(file.originalname)); // Define the file name
  }
});
// Create an upload instance and receive a single file
const upload = multer({ storage: storage }).single('file');

// Create an endpoint to handle file upload
app.post('/upload', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  console.log('File uploaded:', req.file.filename);
  res.status(200).json({ filename: req.file.filename });
});

const uri = process.env.MONGODB_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('MongoDB Error', error);
  }
};

connect();
const server = app.listen(port, host, () => {
    console.log(`Node server is listening to ${server.address().port}`);
});

app.use('/api',router);