import axios from 'axios'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://auth-backend-9hom.onrender.com/api/user/login",
      formData
    );

    if (res.data?.success) {
      // Reset form
      setFormData({ email: "", password: "" });

      // Save token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message || "Login Successful!",{ position: "top-right" });
      navigate("/");
    } else {
      toast.error(res.data?.message || "Invalid login credentials!",{ position: "top-right" });
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    toast.success(error.response?.data?.message || "Login failed, please try again.",{ position: "top-right" });
  }
};



  return (
   <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
  <div className="w-[380px] shadow-lg border border-gray-200 rounded-2xl bg-white p-6">
    <h1 className="text-center text-blue-600 font-bold text-3xl mb-6">
      Login
    </h1>

    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      action=""
    >
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
        value={"Login"}
      />

      <h1
        className="text-center text-sm text-gray-600 cursor-pointer hover:underline"
        onClick={() => navigate("/register")}
      >
        Don’t have an account?{" "}
        <span className="text-blue-600">Create one</span>
      </h1>
    </form>
  </div>
</div>

  )
}

export default Login
