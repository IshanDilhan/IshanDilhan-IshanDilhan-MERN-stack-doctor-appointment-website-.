// App.js
import React from "react";
import { BrowserRouter, Route, Routes ,Navigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";

import DoctorsList from "./Pages/DoctorsList";
import DetailsPage from "./Pages/DetailsPage";
import AppointmentPage from "./Pages/AppointmentPage";
import DoctorModifyPage from "./Pages/Admin/DoctorModifyPage";
import DoctorRegistation from "./Pages/Admin/DoctorRegistation";
import PatientDetails from "./Pages/Admin/PatientDetails";

import Admin from "./Pages/Admin/Admin";
import AdminLoginPage from "./Pages/Admin/AdminLoginPage";
import DoctorDetailsPage from "./Pages/Admin/Doctors";


function App() {
  const token = localStorage.getItem('jwtToken');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment-page" element={<AppointmentPage />} />
        <Route path="/doctors-list" element={<DoctorsList />} />
        <Route path="/details-page" element={<DetailsPage />} />

        <Route path="/admin-login-page" element={<AdminLoginPage/>} />
        {token ? (
          <Route path="/admin-page" element={<Admin />} />
        ) : (
          <Route path="/admin-page" element={<Navigate to="/admin-login-page" />} />
        )}
        <Route path="/doctor-details-page" element={<DoctorDetailsPage />} />

        <Route path="/admin-modify-page" element={<DoctorModifyPage />} />
        <Route
          path="/doctor-registation-page"
          element={<DoctorRegistation />}
        />
        <Route path="/patient-details-page" element={<PatientDetails />} />


      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
