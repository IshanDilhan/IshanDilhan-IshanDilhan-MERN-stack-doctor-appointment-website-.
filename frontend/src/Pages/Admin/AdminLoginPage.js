import React, { useState, useEffect } from "react";
import background from "../../assets/4.jpg";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserId] = useState("");
  const [token, setToken] = useState(null);

  // Function to handle login
  const handleLogin = () => {
    Axios.post(process.env.REACT_APP_ENDPOINT+ "/api/login", {
      adminId: userid,
      username: username,
      password: password
    })
      .then(response => {
        const { gotoken } = response.data; // Assuming backend sends back a token upon successful login
        setToken(gotoken); // Store token in state
        localStorage.setItem('jwtToken', gotoken); // Store token in localStorage
        //toast.success("Login success!");
        console.log(gotoken)
        setTimeout(() => {
          navigate("/admin-page"
            ,        {
              toastId: "success1111",
            }
          ); // Navigate to details-page with id as state
        }, 1000);

      })
      .catch(error => {
        console.error('Login error:', error);
        toast.error("Login failed. Please check your credentials.!");
       
      });
  };



  return (
    <div>
      <Header/>
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Form Container */}
      <div className="bg-blue-200 bg-opacity-40 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>

        {/* UserID Input */}
        <div className="mb-4">
          <label
            htmlFor="userid"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            UserID
          </label>
          <input
            id="userid"
            value={userid}
            type="number"
            placeholder="Enter your UserID"
            onChange={(e) => setUserId(e.target.value)}
            className="px-3 py-2 w-full placeholder-gray-600 border rounded-md focus:outline-none bg-gray-300 focus:border-blue-500"
          />
        </div>

        {/* Username Input */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            id="username"
            value={username}
            type="text"
            placeholder="Enter your Username"
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 placeholder-gray-600 w-full border rounded-md focus:outline-none  bg-gray-300 focus:border-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 placeholder-gray-600 w-full border rounded-md focus:outline-none  bg-gray-300 focus:border-blue-500"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className=" bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </div>
    </div>
  );
};

export default AdminLoginPage;
