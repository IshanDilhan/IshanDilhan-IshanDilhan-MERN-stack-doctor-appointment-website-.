import background from "../assets/8.jpg"; // Import your background image
import Header from "../components/Header"; // Import Header component
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import Details from "../components/Details";
import Axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const DetailsPage = () => {
  const location = useLocation();
  const { id } = location.state|| {};
  const [ gotid ,setgotid] = useState(id)
  const [appointmentData, setAppointmentData] = useState({
    appointmentId: null,
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
  const [searchAppointmentId, setSearchAppointmentId] = useState(null);
  const [notAppoimentFound, setnotAppoimentFound] = useState(true);
  const [notification, setnotification] = useState(false);

  const [isSuccsessSearch, setisSuccsessSearch] = useState(false);
  useEffect(() => {
    if (id === undefined || id === null) {
      console.log(`id: ${id}`);
    } else {
      // Corrected block using curly braces
      console.log(`id: ${id}`);
      setisSuccsessSearch(true);
      getAppointmentById(gotid);
      setgotid(null);

    }
  }, []);
  
  
  const getAppointmentById = (data) => {
    const payload = {
      appointmentId: data,
    };
    Axios.post(process.env.REACT_APP_ENDPOINT + "/api/getAppointmentById", payload)
      .then((response) => {
        console.log(response.data?.response);
        setAppointmentData(response.data?.response || []);
        //console.log(appointmentData.age);
        setisSuccsessSearch(true);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
        setisSuccsessSearch(false);
        setnotAppoimentFound(false);
        setnotification(true);
      });
  };
  const handleShowNotification = () => {
    // Show the toast notification
    toast.error("Appointment Not Found ..", {
      toastId: "success1",
    });
    // Dismiss the notification after it's shown
    setnotification(false);
  };
  const handleSearch = () => {
    try {
      getAppointmentById(searchAppointmentId);
      console.log(appointmentData);

      //setisAppoimentFound(true);
    } catch (error) {
      console.error("Error searching appointment:", error.message);
      // Handle error state or show an error message
    }
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
        <div className="max-w-4xl bg-gray-800 bg-opacity-50 text-white rounded-md shadow-lg p-8 space-y-6 backdrop-blur-md">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Patient Details
          </h2>

          {/* Search Field and Button */}
          <div className="mb-6 flex items-center">
            <input
              type="number"
              placeholder={id ? `Your number : ${id}` : "Appointment number"}
              className="py-3 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow bg-gray-700 text-white"
              value={searchAppointmentId} // Assuming searchAppointmentId is a state variable
              onChange={(e) => setSearchAppointmentId(e.target.value)} // Assuming setSearchAppointmentId is a state setter function
            />
            <button
              onClick={handleSearch} // Replace handleSearch with your search function
              className="bg-blue-500 text-white py-3 px-6 rounded-r-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Search
            </button>
            {notification === true ? (
              <div>{handleShowNotification()}</div>
            ) : (
              <div></div>
            )}
          </div>
          {isSuccsessSearch === true ? (
            <Details appointmentData={appointmentData} />
          ) : notAppoimentFound === true ? (
            <div style={{ textAlign: "center" }}>
              <p></p>
            </div>
          ) : (
            <div>
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
              >
                Not found
              </p>
            </div>
          )}

          {/* Patient Details */}
          {/* <Details/> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailsPage;
