import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios"; // Ensure Axios is imported
import background from "../../assets/8.jpg";
import Header2 from "../../components/Header2"; // Import Header component
import Footer from "../../components/Footer";
import axios from "axios";

const DoctorRegistation = () => {
  const [doctorData, setDoctorData] = useState({
    doctorId: "",
    doctorName: "",
    specialization: "",
    experience: "",
    address: "",
    phoneNumber: "",
    email: "",
    
  });

  const [file,setFile] = useState();
  const [image,setimage] = useState("");
  useEffect(() => {
    
    handleUpload();
  }, [file])
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the file state
  };
  const handleUpload = async () => {
    //e.preventDefault();

    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
  
    try {
      await axios.post(process.env.REACT_APP_ENDPOINT+"/upload", formData).then(response => {setimage(response.data.filename);})

      // Update state with the new image filename
      
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };




  const addDoctor = async (data) => {
    const payload = {
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      specialization: data.specialization,
      experience: data.experience,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
      imageUrl: image,
      
    };

    console.log(payload);

    try {
      const response = await Axios.post(
        "http://localhost:3001/api/addDoctor",
        payload
      );
      console.log("Response: ", response.data);
      return true; // Indicate success
    } catch (error) {
      console.error("Axios Error: ", error);
      return false; // Indicate failure
    }
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpload();
    console.log(image);
    //const success=false;
    const success = await addDoctor(doctorData);
    if (success) {
      toast.success("Doctor registered successfully!", {
        toastId: "success111",
      });
      setTimeout(() => {
        navigate("/doctor-details-page");
      }, 2000);
    } else {
      toast.error("Doctor registration failed!", {
        toastId: "error111",
      });
    }
  };

  return (
    <div>
      <Header2 />
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-2xl mt-4 bg-gray-800 bg-opacity-50 text-white rounded-md shadow-lg p-8 space-y-4 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4">Doctor Registration</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-white">Doctor Id:</label>
              <input
                type="text"
                name="doctorId"
                value={doctorData.doctorId}
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Doctor Name:</label>
              <input
                type="text"
                name="doctorName"
                value={doctorData.doctorName}
                required
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Specialization:</label>
              <input
                type="text"
                name="specialization"
                value={doctorData.specialization}
                required
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">
                Experience (Years):
              </label>
              <input
                type="number"
                name="experience"
                value={doctorData.experience}
                required
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Address:</label>
              <input
                type="text"
                name="address"
                value={doctorData.address}
                required
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={doctorData.phoneNumber}
                required
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Email:</label>
              <input
                type="email"
                name="email"
                value={doctorData.email}
                required
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 text-white">Upload Image:</label>
              <input
                type="file"
                name="imageFile"
                onChange={handleFileChange}
                className=" rounded-md px-3 py-2 w-full  text-gray-200 focus:outline-none focus:border-blue-700"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 col-span-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorRegistation;
