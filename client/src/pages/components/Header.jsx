import React from 'react'
import { CiBoxList } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-blue-200 eczar-ad">
      <header className="flex justify-evenly items-center px-8 py-4">
        <div className="grow border-b-2 border-b-indigo-500 rounded-none pt-10 pb-4">
          <button onClick={()=> navigate('/')}>HOME</button>
        </div>
        <div className="grow">
          <CiBoxList className="mx-auto my-auto text-7xl text-black-600"/>
        </div>
        <div className="grow border-b-2 border-b-indigo-500 rounded-none flex justify-evenly py-4">
          <button className="rounded-full px-8 py-4 button-bg" onClick={()=>navigate('/login')}>LOGIN</button>
          <button className="rounded-full px-8 py-4 button-bg" onClick={()=>navigate('/signup')}>SIGNUP</button>
        </div>
      </header>
    </div>
  )
}

export default Header
