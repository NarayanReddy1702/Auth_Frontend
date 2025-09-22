import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AllUserData = () => {
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAllUser() {
      const res = await axios.get(
        `https://auth-backend-9hom.onrender.com/api/user/allUser`,
       
      );
      setAllUser(res.data.allUserData);
    }
    getAllUser();
  }, [allUser]);
 


const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    try {
      const res = await axios.delete(
        "https://auth-backend-9hom.onrender.com/api/user/deleteUser",
        { data: { id } } // <-- ID sent in request body
      );

      if (res.data.success) {
        // Remove user from UI
        setAllUser((prevUsers) => prevUsers.filter((user) => user._id !== id));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("Something went wrong!");
    }
  }
};




  return (
    <>
      <div className="flex items-center justify-between w-full px-6 py-4 bg-gray-100 shadow rounded-lg">
  {/* Back Button */}
  <button
    className="bg-red-500 hover:bg-red-600 transition text-white font-medium px-5 py-2 rounded-lg shadow cursor-pointer"
    onClick={() => navigate("/")}
  >
    ← Back to Home
  </button>

  {/* Title */}
  <span className="text-gray-800 font-bold text-2xl tracking-wide">
    All Users
  </span>
</div>

      <div className="flex  flex-wrap w-full min-h-screen gap-6 justify-center items-start bg-gray-100 p-6">
        {allUser.length === 0 ? (
          <p className="text-gray-500 text-lg font-medium">
            There is no data yet!
          </p>
        ) : (
          allUser.map((user, index) => (
            <div
              key={index}
              className="w-64 h-52 bg-white shadow-md border border-gray-200 rounded-xl flex flex-col justify-between items-center p-5 transition hover:shadow-lg hover:scale-105"
            >
              <h1 className="text-center text-gray-800 font-bold text-xl">
                {user.username}
              </h1>
              <p className="text-center text-gray-600 text-sm break-all">
                {user.email}
              </p>

              {/* Buttons Row */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/update/${user._id}`)}
                  className="text-white cursor-pointer font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-white cursor-pointer font-semibold bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AllUserData;
