import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DetailsPage from "../Pages/DetailsPage";

const UserForm = ({
  addAppointment,
  updateAppointment,
  getAppointment,
  submitted,
  sendupdatedata,
  isEdit,
  lastAppointmentId,
  doctor,
  alldoctors,
}) => {
  const [id, setid] = useState(null);
  const initialAppointmentId = lastAppointmentId + 1;
  const [appointmentId, setAppointmentId] = useState(initialAppointmentId);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [specificArea, setSpecificArea] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    console.log(sendupdatedata);
    if (isEdit && sendupdatedata) {
      setPatientName(sendupdatedata.patientName || "");
      setAppointmentDate(sendupdatedata.appointmentDate || "");
      setAppointmentTime(sendupdatedata.appointmentTime || "");
      setDoctorName(sendupdatedata.doctorName || "");
      setSpecificArea(sendupdatedata.specificArea || "");
      setAge(sendupdatedata.age || null);
      setGender(sendupdatedata.gender || "");
      setAddress(sendupdatedata.address || "");
      setPhoneNumber(sendupdatedata.phoneNumber || "");
      setEmail(sendupdatedata.email || "");
      setNotes(sendupdatedata.notes || "");
    } else if (doctor) {
      // Set default values or clear state if needed when not in edit mode
      setAppointmentDate("");
      setAppointmentTime("");
      setDoctorName(doctor.doctorName);
      setSpecificArea(doctor.specialization);
      setAge(null);
      setGender("");
      setAddress("");
      setPhoneNumber("");
      setEmail("");
      setNotes("");
      console.log("fk");
    } else {
      setAppointmentDate("");
      setAppointmentTime("");
      setDoctorName("");
      setSpecificArea("");
      setAge(null);
      setGender("");
      setAddress("");
      setPhoneNumber("");
      setEmail("");
      setNotes("");
    }
  }, [isEdit, sendupdatedata, doctor]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    addAppointment({
      appointmentId: initialAppointmentId,
      appointmentDate,
      appointmentTime,
      doctorName,
      specificArea,
      patientName,
      age,
      gender,
      address,
      phoneNumber,
      email,
      notes,
    });

    toast.success("You booked correctly!");
    setTimeout(() => {
      navigate(
        "/details-page",
        { state: { id: initialAppointmentId } },
        {
          toastId: "success111",
        }
      ); // Navigate to details-page with id as state
    }, 2000);
  };
  const handleedit = (e) => {
    e.preventDefault();
    updateAppointment({
      appointmentId: sendupdatedata.appointmentId,
      appointmentDate,
      appointmentTime,
      doctorName,
      specificArea,
      patientName,
      age,
      gender,
      address,
      phoneNumber,
      email,
      notes,
    });
    toast.success("You edited !", {
      toastId: "success11",
    });
    setTimeout(() => {
      navigate("/details-page", {
        state: { id: sendupdatedata.appointmentId },
      }); // Navigate to details-page with id as state
    }, 2000);
  };
  //console.log(all)

  return (
    <div className="max-w-2xl mt-4 bg-gray-800 bg-opacity-50 text-white rounded-md shadow-lg p-8 space-y-4 backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-4">Appointment Page</h2>
      <form
        onSubmit={isEdit ? handleedit : handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <label className="block mb-1 text-white">Appointment Id:</label>
          <input
            type="text"
            name="appointmentId"
            value={
              isEdit
                ? sendupdatedata && sendupdatedata.appointmentId
                : initialAppointmentId
            }
            //onChange={(e) => setAppointmentId(e.target.value)}
            required
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={patientName}
            required
            onChange={(e) => setPatientName(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          />
        </div>

        <div>
          <label className="block mb-1 text-white">Doctor Name:</label>
          <select
            name="doctorName"
            value={doctorName}
            required
            onChange={(e) => setDoctorName(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          >
            <option value="">Select Doctor</option>
            {Array.isArray(alldoctors) &&
              alldoctors.map((doc) => (
                <option key={doc.doctorId} value={doc.doctorName}>
                  {doc.doctorName}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-white">
            Specific Area of the Doctor:
          </label>
          <select
            type="text"
            name="specificArea"
            value={specificArea}
            required
            onChange={(e) => setSpecificArea(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          >
             <option value="">Select specialization</option>
            {Array.isArray(alldoctors) &&
              alldoctors.map((doc) => (
                <option key={doc.doctorId} value={doc.specialization}>
                  {doc.specialization}
                </option>
              ))}
            </select>
        </div>
        <div>
          <label className="block mb-1 text-white">Appointment Date:</label>
          <input
            type="date"
            name="appointmentDate"
            value={appointmentDate}
            required
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Appointment Time:</label>
          <input
            type="time"
            name="appointmentTime"
            value={appointmentTime}
            required
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          />
        </div>

        <div>
          <label className="block mb-1 text-white">Age:</label>
          <input
            type="number"
            name="age"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Gender:</label>
          <select
            name="gender"
            value={gender}
            required
            onChange={(e) => setGender(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-white">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 text-white">Notes:</label>
          <textarea
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border border-blue-500 rounded-md px-3 py-2 w-full h-32 bg-gray-300 text-gray-800 focus:outline-none focus:border-blue-700"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 col-span-2"
        >
          {isEdit ? "Edit" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
