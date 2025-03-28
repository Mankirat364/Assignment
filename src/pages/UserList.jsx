import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import UserCard from "../components/Usercard";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setUserData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const totalPages = 2;
  const baseUrl = useSelector((state) => state.api.baseURL);

  const getUsersData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}api/users?page=${currentPage}`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false); 
  };

  useEffect(() => {
    getUsersData();
  }, [currentPage]);
console.log(data);

  return (
    <div>
      <div className="flex items-center justify-center flex-wrap gap-3 pt-8">
        {loading ? (
          <div className="flex justify-center items-center h-32 w-full">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          data?.data.map((item, index) => (
            <UserCard key={index} firstName={item.first_name} lastName={item.last_name} avatar={item.avatar} email={item.email} id={item.id} />
          ))
        )}
      </div>

      <div className="flex justify-center mt-8 space-x-3">
        <button
          className={`px-4 py-2 flex items-center justify-center rounded-full transition-all duration-300 ${
            currentPage === 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500"
          } text-white shadow-md`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={loading}
        >
          <FaAngleLeft />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-pink-500 to-red-500 text-white scale-110 shadow-lg"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
            onClick={() => setCurrentPage(index + 1)}
            disabled={loading}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 flex items-center justify-center rounded-full transition-all duration-300 ${
            currentPage === totalPages
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500"
          } text-white shadow-md`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={loading}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
