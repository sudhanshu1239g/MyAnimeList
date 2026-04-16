import applogo from '../../../assets/applogo.png'

import child from '../../../assets/child.png'
import { useNavigate } from 'react-router-dom';


import React from 'react'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div>
        <nav className="sticky top-0 z-50 bg-linear-to-b from-gray-900/90 via-gray-900/50 to-transparent backdrop-blur-sm px-4 py-3 ">
            <div className="container mx-auto">
                <div className="flex items-center gap-2">
                    <img src={child} alt="Child" className="h-18 w-22" />
                    <img src={applogo} alt="App Logo" className="h-18 w-58" />
                    <div className='ml-auto flex gap-4'>
                        <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-5 rounded-3xl" onClick={() => navigate("/about-us")}>
                        About Us
                        </button>
                        <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-5 rounded-3xl" onClick={() => navigate("/full-list")}>
                        Home
                        </button>
                        <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-5 rounded-3xl" onClick={() => navigate("/watchlist")}>
                        WatchList+
                        </button>

                    </div>
                
                </div>

            </div>
        </nav>
    </div>
  )
}

export default Navbar
