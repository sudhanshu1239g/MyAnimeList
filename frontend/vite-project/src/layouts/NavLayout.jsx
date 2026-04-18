import React from 'react'
import { Outlet } from "react-router"; // or "react-router-dom"
import Navbar from '../features/animeList/components/Navbar';

const NavLayout = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white">

    
      <Navbar />
      {/* This is where your different pages (Home, Detail, etc.) will appear */}
      <main>
        <Outlet /> 
      </main>
    </div>
    </>
  )
}

export default NavLayout
