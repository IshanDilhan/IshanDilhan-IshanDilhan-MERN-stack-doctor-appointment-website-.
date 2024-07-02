import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import background from "../../assets/8.jpg";
import Header2 from '../../components/Header2'
import Footer from '../../components/Footer'

const DoctorDetailsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const fetchDoctors = async () => {
    try {
      const response = await Axios.get(process.env.REACT_APP_ENDPOINT+"/api/getdoctors");
      setDoctors(response.data.response); // Extracting the array from response.data
      console.log(response.data.response)
    } catch (error) {
      console.error("Axios Error: ", error);
      toast.error("Failed to fetch doctors!", { toastId: "error-fetch" });
    }
  };
  useEffect(() => {


    fetchDoctors();
  }, []);


  const deleteDoctor = async (doctorId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
      if (!confirmDelete) return;

      await Axios.post(process.env.REACT_APP_ENDPOINT+"/api/Deletedoctor", doctorId);
      toast.success("Doctor deleted successfully!", { toastId: "success-delete" });
      setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== doctorId.doctorId));
      
      // Refresh the page or data after deletion (optional)
      fetchDoctors(); 
    } catch (error) {
      console.error("Axios Error: ", error);
      toast.error("Failed to delete doctor!", { toastId: "error-delete" });
    }
  };
  const editDoctor = (doctorId) => {
    navigate("/admin-modify-page", { state: { doctorId } });
    console.log(doctorId)
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
        <div className="max-w-screen-2xl mt-4 bg-gray-800 bg-opacity-50 text-white rounded-md shadow-lg p-8 space-y-4 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4">Doctors Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-max bg-gray border border-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">Doctor Id</th>
                  <th className="py-2 px-4">Doctor Name</th>
                  <th className="py-2 px-4">Specialization</th>
                  <th className="py-2 px-4">Experience</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Phone Number</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className="py-2 px-4">{doctor.doctorId}</td>
                    <td className="py-2 px-4">{doctor.doctorName}</td>
                    <td className="py-2 px-4">{doctor.specialization}</td>
                    <td className="py-2 px-4">{doctor.experience}</td>
                    <td className="py-2 px-4">{doctor.address}</td>
                    <td className="py-2 px-4">{doctor.phoneNumber}</td>
                    <td className="py-2 px-4">{doctor.email}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">

                      <button
                          onClick={() => editDoctor( doctor.doctorId)}
                          className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteDoctor({doctorId : doctor.doctorId})}
                          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DoctorDetailsPage;
