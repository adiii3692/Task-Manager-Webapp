import React from 'react'
import { FaHeart } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BsGithub } from "react-icons/bs";
import { IoDocument } from "react-icons/io5";

const Footer = () => {
  return (
    <div>
      <footer className="absolute bg-black bottom-0 w-full text-white h-fit flex flex-col justify-center">
          <div className="flex justify-center p-4"><IoIosMail className="inline text-white text-3xl mx-4"/><BsGithub className="inline text-white text-3xl mx-4"/><IoDocument className="inline text-white text-3xl mx-4"/></div>
          <div className="flex justify-center p-4">&copy; 2024 Aditya Nair. All rights reserved</div>
          <div className="flex justify-center p-4"><span>Made with React, Node, MongoDB, Express, Tailwind and lots of <FaHeart className="text-red-600 inline"/></span></div>
      </footer>
    </div>
  )
}

export default Footer
