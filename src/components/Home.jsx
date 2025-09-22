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
   <>    <div className=' text-white w-full h-screen rounded-md overflow-hidden'>
           <div className='bg-blue-400 flex justify-between  items-center h-[11%] px-10 '>
            <h1>Logo</h1>
            
            <div className=' flex gap-3 cursor-pointer'><h1 className='text-white gap-4' onClick={()=>navigate("/profile")} >Profile</h1><button className='bg-red-500 text-white font-bold px-4 py-1 rounded cursor-pointer' onClick={handleLogout}>Logout</button></div>
           </div>
          <div className='flex items-center justify-center flex-col gap-5 h-[89%] bg-black '>
            <h1 className='text-white text-5xl font-semibold'>Welcome to learn MERN development</h1>
            <button onClick={()=>navigate("/allUser")} className='bg-blue-600 cursor-pointer rounded-md text-white px-4 py-2 text-xl'>Get Started</button>
          </div>
    </div>
   </>
  )
}

export default Home
