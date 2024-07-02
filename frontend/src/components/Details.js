import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Details = ({ appointmentData, isAppoimentFound }) => {
  const navigate = useNavigate();

  const deleteAppointment = async (data) => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/api/deleteAppoinment",
        data
      );
      return response.data; // Assuming the server responds with useful data
    } catch (error) {
      throw error; // Throw the error to be caught by the caller
    }
  };

  const handleDelete = async () => {
    try {
      // Assuming appointmentData.appointmentId is defined and correct
      await deleteAppointment({ appointmentId: appointmentData.appointmentId });

      // Display success toast after deletion
      toast.success(
        `Appointment number  ${appointmentData.appointmentId} deleted ..`,
        {
          toastId: "success1",
        }
      );

      // Navigate after a delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      // Optionally show an error toast or handle the error in another way
    }
  };

  // Function to handle patient update
  const handleUpdate = () => {
    navigate('/appointment-page', { state: { updatedata: appointmentData} })

  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="flex items-center">
            <span className="font-semibold w-40">Appointment Date:</span>{" "}
            {appointmentData.appointmentDate}
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-40">Doctor Name:</span>{" "}
            {appointmentData.doctorName}
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-40">
              Specific Area of the Doctor:
            </span>{" "}
            {appointmentData.specificArea}
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-40">Patient Name:</span>{" "}
            {appointmentData.patientName}
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-40">Age:</span>{" "}
            {appointmentData.age}
          </p>
        </div>
        <div className="space-y-4">
          <p className="flex items-center">
            <span className="font-semibold w-40">Appointment Time:</span>{" "}
            {appointmentData.appointmentTime}
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-40">Patient Gender:</span>{" "}
            {appointmentData.gender}
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-40">Address:</span>{" "}
            {appointmentData.address}
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-40">Phone Number:</span>{" "}
            {appointmentData.phoneNumber}
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-40">Email:</span>{" "}
            {appointmentData.email}
          </p>
          {appointmentData.notes !== undefined &&
          appointmentData.notes !== null &&
          appointmentData.notes !== "" ? (
            <p className="flex items-left">
              <span className="font-semibold w-40">Notes:</span>{" "}
              {appointmentData.notes}
            </p>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-6 ">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mr-4"
        >
          Update
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete?")) {
              handleDelete();
            }
          }}
          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 mr-4"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Details;
