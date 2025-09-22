import axios from 'axios'

import { useState } from 'react'
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
      "http://localhost:5000/api/user/register",
      formData,
      { withCredentials: true }
    );

    console.log(res.data);

    if (res.data.success) {
      setFormData({ username: "", email: "", password: "" });
      alert("User Registered Successfully!");
      navigate("/login");
    } else {
      alert(res.data.message || "Something went wrong!");
      console.log(res.data.message);
    }
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Registration failed!");
  }
};



  return (
   <div className='w-full h-screen flex items-center justify-center'>
     <div className='w-100 shadow-md border-black h-[60%] rounded-md'>
        <h1 className='text-center text-blue-500 font-semibold text-2xl'>Create an Account</h1>
       <div >
        <form className='flex items-center justify-center gap-5 flex-col mt-15 px-5' onSubmit={handleSubmit} action="">
             <input value={formData.username} onChange={handleChange} name='username' className='w-full px-4 py-2 rounded-md text-black border-2 border-black' type="text"  placeholder='Enter your username'/>
        <input value={formData.email} onChange={handleChange} name='email' className='w-full px-4 py-2 rounded-md text-black border-2 border-black' type="email"  placeholder='Enter your email'/>
        <input value={formData.password} onChange={handleChange} name='password' className='w-full px-4 py-2 rounded-md text-black border-2 border-black' type="password"  placeholder='Enter your password'/>
        <input className='bg-blue-500 text-white font-semibold rounded-md w-full py-3' type="submit" value={"Register"} />
        <h1 className='text-center text-blue-950 cursor-pointer' onClick={()=>navigate("/login")}>if You already have an account</h1>
        </form>
       </div>
     </div>
   </div>
  )
}

export default Register
