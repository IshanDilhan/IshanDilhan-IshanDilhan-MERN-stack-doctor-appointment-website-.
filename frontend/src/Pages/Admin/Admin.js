import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  LogoutIcon, DocumentDuplicateIcon,DocumentSearchIcon, UserIcon, ClipboardListIcon, CalendarIcon, UserCircleIcon, DocumentReportIcon, DeviceTabletIcon } from '@heroicons/react/outline';
import Header2 from '../../components/Header2';
import Footer from '../../components/Footer';
import background from "../../assets/4.jpg"; // Adjust the path as per your project structure
import { toast } from "react-toastify";
const Admin = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    // Check if the notification has already been shown
    const notificationShown = localStorage.getItem('notificationShown');
    console.log(notificationShown)
    if (!notificationShown) {
      toast.success("Login success!", { toastId: "success11g11" });
      setNotification(true);
      // Mark the notification as shown in localStorage
      localStorage.setItem('notificationShown', 'true');
    }
    
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      navigate('/admin-login-page'); // Redirect to login page if token is not present
    }
  }, [navigate]);

  const handleLogout = () => {
    // Show a confirmation dialog before logging out
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear token from localStorage and navigate to the '/' page
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('notificationShown');
      navigate('/');
    }
  };
  

  return (
    <div>
      <Header2 />
      <div
        className="min-h-screen flex"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="ml-64 align-middle p-8 flex justify-center items-center">
          <div className="container flex flex-wrap-reverse gap-4 mx-auto ">

            <Link to="/doctor-registation-page">
              <button className="bg-gray-950 bg-opacity-50 hover:bg-opacity-70 text-white py-4 px-8 rounded-lg shadow-lg focus:outline-none transform transition-transform duration-300 hover:scale-105 w-full">
                <UserIcon className="h-8 w-8 mr-3" /> Register Doctors
              </button>
            </Link>
            <Link to="/admin-modify-page">
              <button className="bg-gray-950 bg-opacity-50 hover:bg-opacity-70 text-white py-4 px-8 rounded-lg shadow-lg focus:outline-none transform transition-transform duration-300 hover:scale-105 w-full">
                <DocumentReportIcon className="h-8 w-8 mr-3" /> Edit Doctors
              </button>
            </Link>
            <Link to="/doctor-details-page">
              <button className="bg-gray-950 bg-opacity-50 hover:bg-opacity-70 text-white py-4 px-8 rounded-lg shadow-lg focus:outline-none transform transition-transform duration-300 hover:scale-105 w-full">
                <ClipboardListIcon className="h-8 w-8 mr-3" /> Doctor Details
              </button>
            </Link>
            <Link to="/patient-details-page">
              <button className="bg-gray-950 bg-opacity-50 hover:bg-opacity-70 text-white py-4 px-8 rounded-lg shadow-lg focus:outline-none transform transition-transform duration-300 hover:scale-105 w-full">
                <DeviceTabletIcon className="h-8 w-8 mr-3" /> Patient Details
              </button>
            </Link>
            <Link to="/">
            
              <button onClick={handleLogout} className="bg-gray-950 bg-opacity-50 hover:bg-opacity-70 text-white py-4 px-8 rounded-lg shadow-lg focus:outline-none transform transition-transform duration-300 hover:scale-105 w-full">
              <LogoutIcon className="h-8 w-8 mr-3" />
                logout
              </button>
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Admin;
