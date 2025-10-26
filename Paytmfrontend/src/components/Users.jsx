import React, { useEffect, useState } from 'react'
import User from './User'
import axios from 'axios'
function Users() {
    const [users , setusers] = useState([])
    const [filter , setfilter] = useState('')

    useEffect(()=>{
        axios.get("http://localhost:3000/api/user/bulk?filter=" + filter)
        .then(response =>{
            setusers(response.data.user)
        })
    } , [filter])
  return (
    <div className='h-fit'>
      <h1 className='text-[20px] font-semibold ml-4 mt-2'>Users</h1>
      <input onChange={(e)=>{
        setfilter(e.target.value)
      }} className='text-[14px] text-[grey] h-[5vh] w-[86vw] ml-4 mt-2' placeholder='Search Users.....' type="text" />
      <div className='h-[0.9px] w-[90vw] ml-4 bg-[grey]'>       
      </div>
      <div>
        {users.map(user => <User user={user}/>)}
      </div>
    </div>
  )
}

export default Users
