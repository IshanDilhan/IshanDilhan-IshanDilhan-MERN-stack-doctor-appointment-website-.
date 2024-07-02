import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  ClipboardListIcon,
  CalendarIcon,
  DocumentReportIcon,
} from "@heroicons/react/outline";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Make sure to include the styles if required

import Axios from "axios";
import { toast } from "react-toastify";

// Import images
import detailsPhoto from "../assets/6.jpg";
import report from "../assets/8.jpg";
import fk from "../assets/7.jpg";

function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await Axios.get(process.env.REACT_APP_ENDPOINT+"/api/getdoctors");
      setDoctors(response.data.response);
      console.log(response.data.response);
    } catch (error) {
      console.error("Axios Error: ", error);
      toast.error("Failed to fetch doctors!", { toastId: "error-fetch" });
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const booknow = (id) => {
    navigate("/appointment-page", { state: { id } });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center">
        
        {/* Carousel for Doctors */}
        <div className=" lg:w-4/5 mb-8 mt-0">
        <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={2000}
      className="rounded-md shadow-md"
      showArrows={true}
      showIndicators={true}
      emulateTouch={true}
      centerMode={true}
      centerSlidePercentage={33}
      style={{ height: "20rem" }}
      swipeable
    >
    {doctors.map((doctor) => (
      <div
        key={doctor.id}
        className="p-6 flex flex-col items-center bg-gray-700 bg-opacity-70 rounded-md "
      >
        <img
          src={process.env.REACT_APP_ENDPOINT+ `/images/${doctor.imageUrl}`}
          alt={doctor.doctorName}
          className="w-32 h-32 rounded-full object-cover mb-4"
          style={{ maxWidth: "30%", maxHeight: "30%" }}
        />
        <h3 className="text-xl font-semibold mb-2">
          {doctor.doctorName}
        </h3>
        <p>
          <span className="font-semibold  mb-2">
            Specialty:
          </span>{" "}
          {doctor.specialization}
        </p>
        <p>
          <span className="font-semibold  mb-2">
            Phone:
          </span>{" "}
          {doctor.phoneNumber}
        </p>
        <p className="truncate max-w-full">{doctor.email}</p>
        <button
          onClick={() => booknow(doctor.doctorId)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mt-5"
        >
          Book Appointment
        </button>
      </div>
    ))}
  </Carousel>
</div>


        {/* Other Sections */}
        {/* Row 1: Doctors List */}
        <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:w-4/5 items-center mb-8">
          {/* Text and Button */}
          <div className="flex-1 md:mr-8">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
                Find Your Doctor
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-700">
                Discover our experienced doctors and specialists for your
                healthcare needs.
              </p>
            </div>
            <Link to="/doctors-list">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex items-center w-full">
                <ClipboardListIcon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 mr-2" />
                Doctors List
              </button>
            </Link>
          </div>
          {/* Image */}
          <div className="flex-1">
            <img
              src={detailsPhoto}
              alt="Hospital"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>

        {/* Row 2: Book Appointment */}
        <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:w-4/5 items-center mb-8">
          {/* Image */}
          <div className="flex-1">
            <img
              src={fk}
              alt="Appointment"
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="flex-1 md:ml-8">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
                Book an Appointment
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-700">
                Schedule your appointment with ease and convenience using our
                online booking system.
              </p>
            </div>
            <Link to="/appointment-page">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex items-center w-full">
                <CalendarIcon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 mr-2" />
                Book Appointment
              </button>
            </Link>
          </div>
        </div>

        {/* Row 3: Medical Details */}
        <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:w-4/5 items-center mb-8">
          {/* Text and Button */}
          <div className="flex-1 md:mr-8">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
                Your Medical Details
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-700">
                View and manage your medical information securely anytime,
                anywhere.
              </p>
            </div>
            <Link to="/details-page">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex items-center w-full">
                <DocumentReportIcon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 mr-2" />
                Medical Details
              </button>
            </Link>
          </div>
          {/* Image */}
          <div className="flex-1">
            <img
              src={report}
              alt="Medical Details"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
