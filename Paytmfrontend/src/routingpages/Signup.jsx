import React, { useState } from 'react'
import Inputtext from '../components/Inputtext'
import { Link } from 'react-router-dom'
import Signin from './Signin'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [firstname , setfirstname] = useState('');
    const [lastname , setlastname] = useState('');
    const [username , setusername] = useState('');
    const [password , setpassword] = useState('');
    const navigate = useNavigate();
  return (
    <div className='h-screen signupbox bg-slate-400'>
      <div className='absolute top-[20vh] left-[10vw] box h-[66.5vh] w-[85vw] bg-white rounded-[20px]'>
        <h1 className='ml-[30vw] mt-[3vh] text-[20px] font-bold uppercase'>Signup</h1>
        <p className='text-[12px] text-[grey] ml-[10vw]'> Enter your infromation to create an account</p>
        <div className='flex flex-col gap-2 ml-2 mt-4'>
        <Inputtext onChange={(e)  => {setfirstname(e.target.value)}} label={"Firstname"} holder={"John"}/>
        <Inputtext onChange={(e)=>{setlastname(e.target.value)}} label={"Lastname"} holder={"Doe"}/>
        <Inputtext onChange={(e)=>{setusername(e.target.value)}} label={"Email"} holder={"John123@gmail.com"}/>
        <Inputtext onChange={(e)=>{setpassword(e.target.value)}} label={"Password"} holder={"pass123"}/>
        </div>
        <button onClick={async  () =>{
            const response = await axios.post("http://localhost:3000/api/user/signup",{
                username,
                firstname,
                lastname,
                password
            });
            localStorage.setItem("token" , response.data.token)
            navigate("/Dashboard")
        }} 
        type="button" class="w-[70vw] ml-[6vw] mt-[2vh] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">signup</button>
        <p className='text-[12px] text-[grey] ml-[15vw]'>Already have an account? 
            <Link className='text-blue-400'  to="/signin"> signin </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
