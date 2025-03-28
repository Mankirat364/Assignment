import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const Login = () => {
  const baseUrl = useSelector((state) => state.api.baseURL);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}api/login`, formData);
      console.log(response.data);
      localStorage.setItem("Token", response.data.token);
      
      toast.success("Login Successful!", { position: "top-center", autoClose: 2000 });
      
      setTimeout(() => {
        navigate("/userList");
      }, 2000); 
    } catch (error) {
      toast.error("Login Failed! Please check your credentials.", { position: "top-center", autoClose: 3000 });
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-700 to-pink-900">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-white text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className="mt-1 w-full p-3 bg-white/20 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6 relative">
            <label className="text-white block text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleInputChange}
              className="mt-1 w-full p-3 bg-white/20 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
              placeholder="Enter your password"
            />
            <span
              className="absolute top-10 right-4 text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-white mt-4 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="underline text-blue-200 hover:text-white">
              Sign Up
            </a>
          </p>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
