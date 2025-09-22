import axios from 'axios'

import { useState } from 'react'
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
      "http://localhost:5000/api/user/login",
      formData,
      { withCredentials: true }
    );

    if (res.data?.success) {
      // Reset form
      setFormData({ email: "", password: "" });

      // Save token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message || "Login Successful!");
      navigate("/");
    } else {
      alert(res.data?.message || "Invalid login credentials!");
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Login failed, please try again.");
  }
};



  return (
   <div className='w-full h-screen flex items-center justify-center'>
     <div className='w-100 shadow-md border-black h-[50%] rounded-md'>
        <h1 className='text-center text-blue-500 font-semibold text-2xl'>Login</h1>
       <div >
        <form className='flex items-center justify-center gap-5 flex-col mt-15 px-5' onSubmit={handleSubmit} action="">
        <input value={formData.email} onChange={handleChange} name='email' className='w-full px-4 py-2 rounded-md text-black border-2 border-black' type="email"  placeholder='Enter your email'/>
        <input value={formData.password} onChange={handleChange} name='password' className='w-full px-4 py-2 rounded-md text-black border-2 border-black' type="password"  placeholder='Enter your password'/>
        <input className='bg-blue-500 text-white font-semibold rounded-md w-full py-3' type="submit" value={"Login"} />
        <h1 className='text-center text-blue-950  cursor-pointer' onClick={()=>navigate("/register")}>Create a new account</h1>
        </form>
       </div>
     </div>
   </div>
  )
}

export default Login
