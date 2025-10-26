import React from 'react'

function Inputtext({onChange , label , holder}) {
  return (
    <div className='h-fit w-full ml-[1vw] '>
      <p className='ml-[1vw] text-[13px] text-[black]'>{label}</p>
      <input onChange={onChange} placeholder={holder} className='text-[grey] w-[75vw] px-1 py-1 rounded text-[13px] outline-none' />
      <div className='w-[75vw] h-[0.5px] bg-[grey]'></div>
    </div>
  )
}

export default Inputtext
