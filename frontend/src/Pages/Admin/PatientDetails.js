import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import background from "../../assets/8.jpg";
import Header2 from '../../components/Header2'
import Footer from '../../components/Footer'

const PatientDetailsPage = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const fetchPatients = async () => {
    try {
      const response = await Axios.get(process.env.REACT_APP_ENDPOINT+"/api/getAppoinment");
      setPatients(response.data.response); // Extracting the array from response.data
      console.log(response.data.response);
    } catch (error) {
      console.error("Axios Error: ", error);
      toast.error("Failed to fetch patients!", { toastId: "error-fetch" });
    }
  };
  useEffect(() => {


    fetchPatients();
  }, []);

  const deletePatient = async (patientId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
      if (!confirmDelete) return;

      await Axios.post(process.env.REACT_APP_ENDPOINT+"/api/deleteAppoinment", {appointmentId :patientId});

      toast.success("Patient deleted successfully!", { toastId: "success-delete" });
      setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== patientId.patientId));
      fetchPatients();
    } catch (error) {
      console.error("Axios Error: ", error);
      toast.error("Failed to delete patient!", { toastId: "error-delete" });
    }
  };

  const editPatient = (id) => {
    navigate("/details-page", { state: { id } });
    console.log(id);
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
          <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-fit bg-gray border border-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">Appointment Id</th>
                  <th className="py-2 px-4">Appointment Date</th>
                  <th className="py-2 px-4">Appointment Time</th>
                  <th className="py-2 px-4">Doctor Name</th>
                  <th className="py-2 px-4">Specific Area</th>
                  <th className="py-2 px-4">Patient Name</th>
                  <th className="py-2 px-4">Age</th>
                  <th className="py-2 px-4">Gender</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Phone Number</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Notes</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td className="py-2 px-4">{patient.appointmentId}</td>
                    <td className="py-2 px-4">{patient.appointmentDate}</td>
                    <td className="py-2 px-4">{patient.appointmentTime}</td>
                    <td className="py-2 px-4">{patient.doctorName}</td>
                    <td className="py-2 px-4">{patient.specificArea}</td>
                    <td className="py-2 px-4">{patient.patientName}</td>
                    <td className="py-2 px-4">{patient.age}</td>
                    <td className="py-2 px-4">{patient.gender}</td>
                    <td className="py-2 px-4">{patient.address}</td>
                    <td className="py-2 px-4">{patient.phoneNumber}</td>
                    <td className="py-2 px-4">{patient.email}</td>
                    <td className="py-2 px-4">{patient.notes}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editPatient(patient.appointmentId)}
                          className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePatient( patient.appointmentId )}
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

export default PatientDetailsPage;
