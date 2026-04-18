import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import applogo from '../../../assets/applogo.png';
import child from '../../../assets/child.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the effect earlier or later depending on your hero height
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-500 px-6 py-3 ${
        isScrolled 
        ? "bg-black/40 backdrop-blur-md border-b border-white/10 shadow-xl" 
        : "bg-linear-to-b from-gray-900/90 to-transparent backdrop-blur-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* --- LOGO SECTION --- */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <img src={child} alt="Child" className="h-11 w-10 object-contain transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-violet-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <img src={applogo} alt="App Logo" className="h-11 w-35 hidden sm:block" />
        </div>

        {/* --- NAV LINKS --- */}
        <div className="flex items-center gap-2 sm:gap-8">
          <div className="flex items-center gap-1 sm:gap-6">
            <NavLink 
              label="Home" 
              active={location.pathname === "/"} 
              onClick={() => navigate("/")} 
            />
            <NavLink
              label="Full List"
              active={location.pathname === "/full-list"}
              onClick={() => navigate("/full-list")}
            />
            <NavLink 
              label="About Us" 
              active={location.pathname === "/about-us"} 
              onClick={() => navigate("/about-us")} 
            />
            
          </div>

          {/* --- WATCHLIST CTA --- */}
          <button 
            onClick={() => navigate("/anime/full-list")}
            className="group relative px-6 py-2 bg-violet-600 rounded-full font-bold text-sm text-white overflow-hidden transition-all hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              WatchList
              <span className="text-violet-200 transition-transform group-hover:translate-x-1">+</span>
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// Internal Helper for Nav Links
const NavLink = ({ label, onClick, active }) => (
  <button 
    onClick={onClick}
    className={`relative px-3 py-2 text-sm font-semibold transition-colors duration-300 group ${
      active ? "text-white" : "text-gray-400 hover:text-white"
    }`}
  >
    {label}
    {/* Animated Underline */}
    <span className={`absolute bottom-0 left-0 h-0.5 bg-violet-500 transition-all duration-300 ${
      active ? "w-full" : "w-0 group-hover:w-full"
    }`} />
  </button>
);

export default Navbar;