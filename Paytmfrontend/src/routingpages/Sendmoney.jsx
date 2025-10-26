import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sendmoney() {
  const [amount, setAmount] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get('id');
  const name = searchParams.get('name');

  const handleTransfer = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/account/transfer',
        {
          amount: parseInt(amount),
          to: id,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
      alert('Error transferring money');
    }
  };

  return (
    <div className='h-screen w-full bg-gray-200 flex items-center justify-center'>
      <div className='h-[45vh] w-[70vw] rounded-[20px] shadow-lg space-y-8 bg-white p-6'>
        <h1 className='text-[20px] font-bold text-center mt-2'>Send Money</h1>

        <div className='flex gap-5 items-center'>
          <div className='w-10 h-10 rounded-full bg-green-500 flex items-center justify-center ml-5'>
            <span className='text-2xl text-white'>
              {name ? name[0].toUpperCase() : '?'}
            </span>
          </div>
          <h1 className='text-[20px] font-semibold'>{name}</h1>
        </div>

        <input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className='h-[6vh] w-[65vw] -ml-3 rounded-lg text-gray-700 pl-2 outline-none border'
          id='amount'
          type='number'
          placeholder='Enter amount...'
        />

        <button
          onClick={handleTransfer}
          className='h-[6vh] w-[35vw] bg-green-500 rounded-[10px] ml-[17vw] text-white hover:bg-green-600 transition'
        >
          Transfer ₹{amount || ''}
        </button>
      </div>
    </div>
  );
}

export default Sendmoney;
