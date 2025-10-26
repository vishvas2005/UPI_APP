import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Users from '../components/Users';
function Dashboard() {
 const [balance , setbalance] = useState(0);

  useEffect(()=>{
    const fetchbalance = async ()=>{
      try {
        const token = localStorage.getItem('token')
        if(!token){
          alert("please login first");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/account/balance",{
          headers :{
            Authorization : `bearer ${token}`
          }
        });
        setbalance(response.data.balance);
      }catch(error){
        console.error(error);
        alert("Error fetching balance")
    }
    };
    fetchbalance();
  },[])
  return <>
    <div className="shadow h-14 flex justify-between">
    <div className="flex flex-col justify-center h-full ml-4">
        Money App
    </div>
    <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
            Hello
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl relative overflow-hidden">
                <img className='h-10 w-full rounded-full' src="https://i.redd.it/wso0ed59j7se1.jpeg" alt="" />
            </div>
        </div>
    </div>
</div>
 <div className='flex gap-5 ml-4'>
 <h1 className='font-semibold'>Your Balance -</h1>
 <h1>RS {balance}</h1>
</div>
<div>
  <Users/>
</div>
</>
}

export default Dashboard
