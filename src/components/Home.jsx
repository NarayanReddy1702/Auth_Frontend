import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
const navigate = useNavigate()
  
  const handleLogout=()=>{
       localStorage.clear()
       alert("Logout Successfully")
       setTimeout(()=>{
         navigate("/login")
       },1000)
  }
  return (
   <>
  <div className="text-white w-full h-screen flex flex-col overflow-hidden">
    {/* Navbar */}
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 flex justify-between items-center h-[12%] px-10 shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">🚀 MERN Logo</h1>

      <div className="flex gap-6 items-center">
        <h1
          className="hover:text-gray-200 text-lg cursor-pointer transition"
          onClick={() => navigate("/profile")}
        >
          Profile
        </h1>
        <button
          className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>

    {/* Hero Section */}
    <div className="flex-1 flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <h1 className="text-white text-5xl font-extrabold text-center leading-snug">
        Welcome to <span className="text-blue-400">Learn MERN Development</span>
      </h1>
      <button
        onClick={() => navigate("/allUser")}
        className="bg-blue-600 hover:bg-blue-700 transition cursor-pointer rounded-lg text-white px-6 py-3 text-xl font-semibold shadow-lg"
      >
        Get Started
      </button>
    </div>
  </div>
</>

  )
}

export default Home
