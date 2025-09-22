import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function getAllUser() {
      try {
        const res = await axios.get("https://auth-backend-9hom.onrender.com/api/user/allUser", {
          withCredentials: true,
        });

        const data = res.data.allUserData.find((item) => item._id === userId);

        if (data) {
          setFormData({
            username: data.username || "",
            email: data.email || "",
            password: data.password || "", 
          });
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    }
    getAllUser();
  }, [userId]);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://auth-backend-9hom.onrender.com/api/user/updateUser/${userId}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("User updated successfully!",{position:"top-right"});
        setFormData({ username: "", email: "", password: "" });
        navigate("/allUser");
      }
    } catch (err) {
      toast.error("User Update Failed",{position:"right-right"})
    }
  };

  return (
   <div className="w-full h-screen flex items-center justify-center bg-gray-100">
  <div className="w-[400px] bg-white shadow-lg border border-gray-200 rounded-2xl p-8">
    <h1 className="text-center text-orange-500 font-bold text-3xl mb-6">
      Update User
    </h1>
    <form
      className="flex flex-col gap-4"
      onSubmit={handleUpdate}
    >
      <input
        value={formData.username}
        onChange={handleChange}
        name="username"
        className="w-full px-4 py-2 rounded-lg text-gray-800 border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
        type="text"
        placeholder="Enter your username"
      />
      <input
        value={formData.email}
        onChange={handleChange}
        name="email"
        className="w-full px-4 py-2 rounded-lg text-gray-800 border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
        type="email"
        placeholder="Enter your email"
      />
      <input
        value={formData.password}
        onChange={handleChange}
        name="password"
        className="w-full px-4 py-2 rounded-lg text-gray-800 border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
        type="password"
        placeholder="Enter your password"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold rounded-lg w-full py-3 transition"
      >
        Update
      </button>
      <p
        className="text-center text-sm text-gray-600 mt-2 cursor-pointer hover:text-orange-600"
        onClick={() => navigate("/login")}
      >
        Already have an account? <span className="font-semibold cursor-pointer">Login</span>
      </p>
    </form>
  </div>
</div>

  );
};

export default Update;
