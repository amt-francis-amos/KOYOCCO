import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import {useNavigate} from'react-router-dom'

const Navbar = () => {



    const navigate = useNavigate()

    const Logout = async () =>{
        navigate('/')
    
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-10 sm:w-20 cursor-pointer' src={assets.koyoccoLogo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'></p>
        </div>
        <button onClick={Logout} className='bg-primary px-10 py-2 text-sm text-white rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar