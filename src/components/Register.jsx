import axios from 'axios'

import { useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom"

const Register = () => {
    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://auth-backend-9hom.onrender.com/api/user/register",
      formData
    );

    console.log(res.data);

    if (res.data.success) {
      setFormData({ username: "", email: "", password: "" });
      toast.success("User Registered Successfully!",{position:"top-right"});
      navigate("/login");
    } else {
      toast.error(res.data.message || "Something went wrong!",{position:"top-right"});
      console.log(res.data.message);
    }
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Registration failed!",{position:"top-right"});
  }
};



  return (
   <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
  <div className="w-[400px] shadow-lg border border-gray-200 h-auto rounded-2xl bg-white p-6">
    <h1 className="text-center text-blue-600 font-bold text-3xl mb-6">
      Create an Account
    </h1>

    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      action=""
    >
      <input
        value={formData.username}
        onChange={handleChange}
        name="username"
        className="w-full px-4 py-2 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        type="text"
        placeholder="Enter your username"
      />

      <input
        value={formData.email}
        onChange={handleChange}
        name="email"
        className="w-full px-4 py-2 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        type="email"
        placeholder="Enter your email"
      />

      <input
        value={formData.password}
        onChange={handleChange}
        name="password"
        className="w-full px-4 py-2 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        type="password"
        placeholder="Enter your password"
      />

      <input
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg w-full py-3 cursor-pointer hover:opacity-90 transition-all shadow-md"
        type="submit"
        value={"Register"}
      />

      <h1
        className="text-center text-sm text-gray-600 cursor-pointer hover:underline"
        onClick={() => navigate("/login")}
      >
        Already have an account? <span className="text-blue-600">Login</span>
      </h1>
    </form>
  </div>
</div>

  )
}

export default Register
