import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext'; // Path to your context
import applogo from '../../../assets/applogo.png';
import child from '../../../assets/child.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useContext(AuthContext); // Pull auth state
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-500 px-6 py-3 ${isScrolled
                    ? "bg-black/60 backdrop-blur-md border-b border-white/10 shadow-xl"
                    : "bg-linear-to-b from-gray-900/90 to-transparent"
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
                <div className="flex items-center gap-4 sm:gap-8">
                    <div className="hidden md:flex items-center gap-6">
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

                    {/* --- AUTH / WATCHLIST SECTION --- */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                {/* Logged In View */}
                                <button
                                    onClick={() => navigate("/watchlist")}
                                    className={`px-5 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                                        location.pathname === "/watchlist" 
                                        ? "bg-violet-600 text-white" 
                                        : "text-gray-300 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    Watchlist
                                    {user.watchlist?.length > 0 && (
                                        <span className="bg-white text-violet-600 px-1.5 py-0.5 rounded-md text-[10px] font-black">
                                            {user.watchlist.length}
                                        </span>
                                    )}
                                </button>
                                
                                <button 
                                    onClick={logout}
                                    className="text-gray-400 hover:text-red-400 text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            /* Logged Out View */
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-2.5 bg-violet-600 rounded-full font-black text-xs text-white uppercase tracking-widest transition-all hover:bg-violet-500 hover:scale-105 active:scale-95 shadow-lg shadow-violet-600/20"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ label, onClick, active }) => (
    <button
        onClick={onClick}
        className={`relative px-1 py-2 text-sm font-bold transition-colors duration-300 group ${active ? "text-white" : "text-gray-400 hover:text-white"
            }`}
    >
        {label}
        <span className={`absolute bottom-0 left-0 h-0.5 bg-violet-500 transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"
            }`} />
    </button>
);

export default Navbar;