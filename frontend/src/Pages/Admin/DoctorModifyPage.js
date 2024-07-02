import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import background from "../../assets/8.jpg";
import Header2 from "../../components/Header2";
import Footer from "../../components/Footer";

const DoctorModifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId } = location.state || {}; // Ensure location.state is defined

  console.log(doctorId); // This should log 12 if location.state is { doctorId: 12 }

  const [doctorData, setDoctorData] = useState({
    doctorId: doctorId ? doctorId : null,
    doctorName: "",
    specialization: "",
    experience: "",
    address: "",
    phoneNumber: "",
    email: "",
    imageUrl: "",
  });
  console.log(doctorData)


  const editDoctor = async (data) => {
    const payload = {};

    // Iterate through the keys of the data object and add non-empty values to the payload
    for (const key in data) {
        if (data[key] !== "") {
            payload[key] = data[key];
        }
    }

    //console.log(data);

    try {
        const response = await Axios.post(process.env.REACT_APP_ENDPOINT+"/api/updateDoctor", payload);
        console.log("Response: ", response.data);
        return true; // Indicate success
    } catch (error) {
        console.error("Axios Error: ", error);
        return false; // Indicate failure
    }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    if (editDoctor(doctorData)) {
        toast.success(`Doctor id ${doctorData.doctorId} Edited !`, {
            toastId: "success1121",
        });
        setTimeout(() => {
            navigate("/doctor-details-page");
        }, 2000);
    } else {
        toast.error(`Failed to edit ${doctorData.doctorId}!`, {
            toastId: "error111",
        });
    }
};


  return (
    <div>
      <Header2/>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-2xl mt-4 bg-gray-800 bg-opacity-50 text-white rounded-md shadow-lg p-8 space-y-4 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4">Edit Doctor Details</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              
              <label className="block mb-1 text-white">Doctor Id: </label>


              <input
                type="number"
                name="doctorId"
                value={doctorData.doctorId}
                onChange={handleChange}
                required
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Doctor Name:</label>
              <input
                type="text"
                name="doctorName"
                value={doctorData.doctorName}
                
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
                
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Experience (Years):</label>
              <input
                type="number"
                name="experience"
                value={doctorData.experience}
                
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
                
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 text-white">Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={doctorData.imageUrl}
                onChange={handleChange}
                className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
              />
            </div>
            <div className="col-span-2 flex justify-start">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Update
              </button>
              

              
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DoctorModifyPage;
