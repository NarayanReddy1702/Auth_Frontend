import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllUserData = () => {
    const [allUser,setAllUser]=useState([])
    const navigate = useNavigate()
  useEffect(() => {
    async function getAllUser() {
      const res = await axios.get("http://localhost:5000/api/user/allUser", {
        withCredentials: true,
      });
      setAllUser(res.data.allUserData)
    }
    getAllUser();
  }, []);
console.log(allUser);

  
  return (
    <div className="flex flex-wrap w-full min-h-100  gap-5">
      {allUser.length===0?"There is no data Yet !":allUser.map((user,index)=>(
        <div key={index} className="w-60 h-40 border-2 bg-black rounded-md flex flex-col items-center gap-5">
        <h1 className="text-center text-white text-2xl">{user.username}</h1>
        <p className="text-center text-gray-600 text-xl">{user.email}</p>
        <button onClick={()=>navigate(`/update/${user._id}`)}  className="text-white font-semibold bg-red-700 rounded-md px-4 py-2 cursor-pointer">
          Update
        </button>
      </div>
      ))}
    </div>
  );
};

export default AllUserData;
