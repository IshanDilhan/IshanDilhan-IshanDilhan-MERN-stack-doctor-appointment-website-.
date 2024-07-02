import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify"; // Assuming you use react-toastify for notifications
import background from "../assets/1.jpg"; // Import your background image
import Header from "../components/Header"; // Import Header component
import Footer from "../components/Footer";
import doctorImage1 from "../assets/1.jpg";
import doctorImage2 from "../assets/2.jpg";
import doctorImage3 from "../assets/3.jpg";
import doctorImage4 from "../assets/4.jpg";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  //const [image ,setimage] = useState("")
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await Axios.get(process.env.REACT_APP_ENDPOINT+"/api/getdoctors");
      setDoctors(response.data.response); // Extracting the array from response.data
      console.log(response.data.response);
    } catch (error) {
      console.error("Axios Error: ", error);
      toast.error("Failed to fetch doctors!", { toastId: "error-fetch" });
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);
  console.log(doctors);
  const booknow = (id) => {
    navigate("/appointment-page", { state: { id } });
  };
  return (
    <div>
      <Header />
      <div></div>
      <div
  className="min-h-screen flex items-center justify-center"
  style={{
    background: "linear-gradient(to bottom right, #8db5f2, #dae0e8)"
  }}
>


        <div className="max-w-screen-lg bg-gray-800 bg-opacity-50 text-white rounded-md shadow-lg p-8 space-y-8 backdrop-blur-md">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, idx) => (
              <div
                key={doctor.id}
                className="bg-gray-700 bg-opacity-70 p-6 rounded-md shadow-md flex flex-col items-center"
              >
                <img
                  src={process.env.REACT_APP_ENDPOINT+`/images/${doctor.imageUrl}`}
                  alt={doctor.doctorName}
                  className="w-32 h-32 rounded-full mb-4"
                />

                <h3 className="text-xl font-semibold mb-2">
                  {doctor.doctorName}
                </h3>
                <p>
                  <span className="font-semibold text-gray-200 mb-2">
                    Specialty:
                  </span>{" "}
                  {doctor.specialization}
                </p>
                <p>
                  <span className="font-semibold text-gray-200 mb-2">T.P:</span>{" "}
                  {doctor.phoneNumber}
                </p>
                <p className="truncate max-w-full">
                  
                  {doctor.email}
                </p>

                <button
                  onClick={() => booknow(doctor.doctorId)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mt-5"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorsList;
