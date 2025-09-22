import axios from "axios";
import React, { useEffect, useState } from "react";
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
        const res = await axios.get("http://localhost:5000/api/user/allUser", {
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
        `http://localhost:5000/api/user/updateUser/${userId}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("User updated successfully!");
        setFormData({ username: "", email: "", password: "" });
        navigate("/allUser");
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-100 shadow-md border-black h-[50%] rounded-md p-5">
        <h1 className="text-center text-orange-500 font-semibold text-2xl">
          Update User
        </h1>
        <form
          className="flex items-center justify-center gap-5 flex-col mt-5 px-5"
          onSubmit={handleUpdate}
        >
          <input
            value={formData.username}
            onChange={handleChange}
            name="username"
            className="w-full px-4 py-2 rounded-md text-black border-2 border-black"
            type="text"
            placeholder="Enter your username"
          />
          <input
            value={formData.email}
            onChange={handleChange}
            name="email"
            className="w-full px-4 py-2 rounded-md text-black border-2 border-black"
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={formData.password}
            onChange={handleChange}
            name="password"
            className="w-full px-4 py-2 rounded-md text-black border-2 border-black"
            type="password"
            placeholder="Enter your password"
          />
          <input
            className="bg-orange-500 text-white font-semibold rounded-md w-full py-3"
            type="submit"
            value="Update"
          />
          <h1
            className="text-center text-orange-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            If you already have an account
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Update;
