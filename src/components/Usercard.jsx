import axios from "axios";
import React, { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCard = ({ firstName, lastName, avatar, email, id }) => {
  const baseUrl = useSelector((state) => state.api.baseURL);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userData, setUserData] = useState({ firstName, lastName, email, avatar });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      await axios.put(`${baseUrl}api/users/${id}`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("User Successfully Updated");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}api/users/${id}`);

      toast.success("User Successfully Deleted");
      
      setTimeout(() => {
        toast.dismiss(); 
        setShowDeleteDialog(false);
      }, 4000); 
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <>
      <div className="relative bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl text-center w-72">
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleEditClick}
            className="p-2 rounded-full bg-gray-800/60 hover:bg-pink-500 text-white transition"
          >
            <FaPencilAlt size={14} />
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="p-2 rounded-full bg-gray-800/60 hover:bg-red-500 text-white transition"
          >
            <FaTrash size={14} />
          </button>
        </div>

        <div className="relative mx-auto w-24 h-24">
          <img
            src={userData.avatar}
            alt={`${userData.firstName} ${userData.lastName}`}
            className="w-24 h-24 rounded-full mx-auto"
          />
        </div>

        <h2 className="text-white text-2xl font-bold mt-4 tracking-wide">
          {userData.firstName} {userData.lastName}
        </h2>
        <p className="text-sm text-zinc-500 mt-4 tracking-wide">{userData.email}</p>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-md">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-80 relative">
            <h2 className="text-white text-xl font-semibold text-center mb-4">
              Edit User
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                placeholder="Last Name"
              />
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                placeholder="Email"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 px-4 py-2 text-white rounded-md hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-md">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-80 relative">
            <h2 className="text-white text-xl font-semibold text-center mb-4">
              Delete User?
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="bg-gray-500 px-4 py-2 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default UserCard;
