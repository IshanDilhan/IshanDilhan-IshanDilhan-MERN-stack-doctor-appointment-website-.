import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ClipboardListIcon, CalendarIcon, UserCircleIcon, LogoutIcon } from '@heroicons/react/outline';

const Header2 = () => {
  const navigate = useNavigate();

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
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Doctor Appointment Website</h1>
        <nav className="flex space-x-4">
          <NavLink to="/admin-page" icon={<HomeIcon className="h-5 w-5 mr-1" />}>
            Admin Page
          </NavLink>
          <NavLink to="/doctor-registation-page" icon={<UserIcon className="h-5 w-5 mr-1" />}>
            Register Doctors
          </NavLink>
          <NavLink to="/admin-modify-page" icon={<ClipboardListIcon className="h-5 w-5 mr-1" />}>
            Edit Doctors
          </NavLink>
          <NavLink to="/doctor-details-page" icon={<CalendarIcon className="h-5 w-5 mr-1" />}>
            Doctor details
          </NavLink>
          <NavLink to="/patient-details-page" icon={<UserCircleIcon className="h-5 w-5 mr-1" />}>
            Patient Details
          </NavLink>
          
          <button onClick={handleLogout} className="flex items-center bg-gray-950 bg-opacity-50 hover:bg-opacity-70 text-white py-2 px-4 rounded-lg shadow-lg focus:outline-none transform transition-transform duration-300 hover:scale-105">
            <LogoutIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
        
        </nav>
      </div>
    </header>
  );
};

// Custom NavLink component to encapsulate link styling
const NavLink = ({ to, icon, children }) => (
  <Link to={to} className="text-white flex items-center hover:underline">
    {icon}
    {children}
  </Link>
);

export default Header2;
