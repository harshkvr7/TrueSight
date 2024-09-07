import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-gray-900">
      <span className="text-3xl leading-none font-mono text-white" href="#">
        <Link to={"/"}>TrueSight</Link>
      </span>
      <div className="lg:hidden">
        <button className="navbar-burger flex items-center text-white p-3">
          <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      
      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
        <li><span className="text-l text-gray-300 hover:text-white" href="#"><Link to={"/"}>Home</Link></span></li>
        <li><span className="text-l text-gray-300 hover:text-white" href="#"><Link to={"/about"}>About us</Link></span></li>
        <li><span className="text-l text-gray-300 hover:text-white" href="#"><Link to={"/try"}>Services</Link></span></li>
        <li><span className="text-l text-gray-300 hover:text-white" href="#"><Link to={"/feedback"}>Feedback</Link></span></li>
      </ul>
      
      <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 font-bold rounded-xl transition duration-200" href="#">Sign In</a>
      <a className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="#">Sign up</a>
    </nav>
  )
}

export default Navbar
