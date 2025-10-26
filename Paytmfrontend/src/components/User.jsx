import React from 'react'
import { useNavigate } from 'react-router-dom'
function User({user}) {
    const navigate = useNavigate()
  return (
    <div className='h-fit mt-5 ml-4'>
      <div className='flex gap-14   '>
        <div className='flex justify-center items-center h-10 w-14 bg-slate-400 rounded-full'>
          <p className='uppercase text-[white] text-[15px]'>{user.firstname[0]}</p>
        </div>
        <div>
            <p className='w-[20vw] mt-2 font-semibold text-[15.5px]'>{user.firstname}{user.lastname}</p>
        </div>
        <button onClick={(e) => {
                navigate(`/send?id=${user._id}&name=${user.firstname}`);
            }} className='h-[5vh] w-[25vw] text-[13px] bg-slate-700 text-white rounded-lg'>Send money</button>
      </div>
    </div>
  )
}

export default User
