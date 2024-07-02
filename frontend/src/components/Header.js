import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, ClipboardListIcon, CalendarIcon,UserCircleIcon } from '@heroicons/react/outline';

const Header = () => {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Doctor Appointment Website</h1>
        <nav className="flex space-x-4">
          <Link to="/" className="text-white flex items-center hover:underline">
            <HomeIcon className="h-5 w-5 mr-1" /> Home
          </Link>
          <Link to="/doctors-list" className="text-white flex items-center hover:underline">
            <UserIcon className="h-5 w-5 mr-1" /> Doctors
          </Link>
          <Link to="/details-page" className="text-white flex items-center hover:underline">
            <ClipboardListIcon className="h-5 w-5 mr-1" /> Details
          </Link>
          <Link to="/appointment-page" className="text-white flex items-center hover:underline">
            <CalendarIcon className="h-5 w-5 mr-1" /> Appointments
          </Link>
          <Link to="/admin-login-page" className="text-white flex items-center hover:underline">
            <UserCircleIcon className="h-5 w-5 mr-1" /> Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
