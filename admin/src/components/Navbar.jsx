import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import {AdminContext} from '../context/AdminContext.jsx'
import {useNavigate} from'react-router-dom'

const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext)

    const navigate = useNavigate()

    const Logout = async () =>{
        navigate('/')
       aToken && setAToken('')
       aToken && localStorage.removeItem('aToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.koyoccoLogo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={Logout} className='bg-primary px-10 py-2 text-sm text-white rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar