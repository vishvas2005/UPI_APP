import React, { useState } from 'react'
import Inputtext from '../components/Inputtext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const [username , setusername] = useState('');
  const [password , setpassword] = useState('');
  const navigate = useNavigate();
  const onlogin =async () =>{
  try {
    const response = await axios.post("http://localhost:3000/api/user/signin",{
      username,
      password
    })
    localStorage.setItem('token' , response.data.token);
    navigate("/Dashboard");
  }catch(error){
    console.log("invalid username or password")
    alert("Inavlid username and password")
  }
  } 
  return (
    <div className='h-screen signupbox bg-slate-400'>
      <div className='absolute top-[20vh] left-[8vw] box h-[56.5vh] w-[85vw] bg-white rounded-[20px]'>
        <h1 className='ml-[30vw] mt-[3vh] text-[20px] font-bold uppercase'>Signin</h1>
        <p className='text-[12px] text-[grey] ml-[10vw]'> Enter your infromation to Signin an account</p>
        <div className='flex flex-col gap-5 ml-2 mt-10'>
        <Inputtext onChange={(e)=>{
          setusername(e.target.value)
        }} label={"Email"} holder={"John123@gmail.com"}/>
        <Inputtext onChange={(e)=>{
          setpassword(e.target.value)
        }} label={"Password"} holder={"pass123"}/>
        </div>
        <button onClick={onlogin} type="button" class="w-[70vw] ml-[6vw] mt-[5vh] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">signin</button>
        <p className='text-[12px] text-[grey] ml-[15vw]'>Don't  have an account? 
            <Link className='text-blue-400'  to="/signup"> signup </Link>
        </p>
      </div>
    </div>
  )
}

export default Signin
