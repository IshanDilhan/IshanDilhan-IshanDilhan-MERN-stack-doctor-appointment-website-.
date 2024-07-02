import React, { useState } from "react";
import { useEffect } from "react";
import background from "../assets/8.jpg"; // Import your background photo
import UserForm from "../components/userForm";
import Header from "../components/Header"; // Import Header component
import Footer from "../components/Footer";
import Axios from "axios";
import { useLocation } from "react-router-dom";



const AppointmentPage = () => {
  const location = useLocation();
  const { id} = location.state|| {};

  const { updatedata} = location.state|| {};
  //const [ gotid ,setgotid] = useState(id)
  const [doctors, setdoctors] = useState({});
  const [alldoctors,setalldoctors] = useState({});
  const [lastAppointmentId, setLastAppointmentId] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    appointmentNumber: "",
    appointmentDate: "",
    doctorName: "",
    specificArea: "",
    patientName: "",
    age: null,
    address: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });
  const [sendupdatedata, setsendupdatedata] = useState(updatedata);
  const [submited, setSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectappointment, setSelectedappointment] = useState({});

  useEffect(() => {
    const fetchLastAppointmentId = async () => {
      try {
        const id = await getlastAppointmentId();
        setLastAppointmentId(id);
      } catch (error) {
        console.error("Failed to fetch last appointment ID:", error);
        // Handle error state or retry mechanism if needed
      }
    };
    if (updatedata && Object.keys(updatedata).length !== 0) {
      setIsEdit(true)
       setsendupdatedata(updatedata); 
    } else {
      
    }
   
    //console.log(updatedata);

    fetchLastAppointmentId();
    getdoctorbyId(id);
    getdoctors();

  }, []); // Empty dependency array ensures this effect runs only once on mount
  const getAppointment = () => {
    Axios.get(process.env.REACT_APP_ENDPOINT+ "/api/getAppoinment")
      .then((response) => {
        setAppointmentData(response.data?.response || []);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
        console.log("REACT_APP_ENDPOINT:", process.env.REACT_APP_ENDPOINT);
      });
  };
  const getlastAppointmentId = () => {
    return Axios.get(process.env.REACT_APP_ENDPOINT+ "/api/getlastAppointment")
      .then((response) => {
        const lastAppointmentId = response.data.lastAppointmentId; // Assuming response.data is structured correctly
        console.log("Last Appointment ID:", lastAppointmentId);
        return lastAppointmentId; // Return the ID for further use
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        throw error; // Re-throw the error to propagate it further if needed
      });
  };
  const getdoctorbyId = (data) => {

    return Axios.post(process.env.REACT_APP_ENDPOINT+ "/api/getdoctorbyid",{doctorId : data})
      .then((response) => {
        setdoctors(response.data?.response); 
        
      })
      .catch((error) => {
        console.error("Axios Error:", error);
         
      });
  };
  const getdoctors = () => {
    return Axios.get(process.env.REACT_APP_ENDPOINT+ "/api/getdoctors")
      .then((response) => {
        console.log(response.data?.response);
        setalldoctors(response.data?.response);
        console.log(response.data?.response)
      })
      .catch((error) => {
        console.error("Axios Error:", error);
         
      });
  };
  

  const addAppointment = (data) => {
    setSubmitted(true);
    const payload = {
      appointmentId: data.appointmentId,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      doctorName: data.doctorName,
      specificArea: data.specificArea,
      patientName: data.patientName,
      age: data.age,
      gender: data.gender,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
      notes: data.notes,
    };
    console.log(data);
    Axios.post(process.env.REACT_APP_ENDPOINT+ "/api/addAppoinment", payload)
      .then((response) => {
        setSubmitted(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };
  const updateAppointment = (data) => {
    setSubmitted(true);
    const payload = {
      appointmentId: data.appointmentId,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      doctorName: data.doctorName,
      specificArea: data.specificArea,
      patientName: data.patientName,
      age: data.age,
      gender: data.gender,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
      notes: data.notes,
    };
    Axios.post(process.env.REACT_APP_ENDPOINT+ "/api/updateAppoinment", payload)
      .then((response) => {
        setSubmitted(false);
        isEdit(false);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  return (
    <div>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <UserForm
          addAppointment={addAppointment}
          updateAppointment={updateAppointment}
          submited={submited}
          sendupdatedata={sendupdatedata}
          doctor ={doctors}
          isEdit={isEdit}
          getAppointment = {getAppointment}
          lastAppointmentId = {lastAppointmentId}
          alldoctors = {alldoctors}
        />
      </div>

      <Footer />
    </div>
  );
};

export default AppointmentPage;
