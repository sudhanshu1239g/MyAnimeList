import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import piclogin from '../../assets/imglogin.png'
import luffy from '../../assets/luffy.gif'

import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://myanimelist-cd1p.onrender.com/api/auth/login', formData);
      
      // Store in Context and LocalStorage
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      
      navigate('/'); // Go home after success
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
  
  <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900/40 backdrop-blur-xl">
    
    {/* LEFT SIDE - IMAGE */}
    <div className="w-1/5 mr-20 hidden md:flex items-center justify-center bg-linear-to-br bg-gray-900/40 p-6">
      <img 
        src={luffy} 
        alt="login visual" 
        className="w-full h-full object-contain drop-shadow-2xl"
      />
    </div>

    {/* RIGHT SIDE - FORM */}
    <div className="w-full md:w-1/2 p-8 sm:p-10">
      
      <h2 className="text-3xl font-black text-white mb-2 text-center">
        Welcome Back
      </h2>
      <p className="text-gray-400 text-center mb-8 text-sm">
        Login to manage your watchlist
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
            Email Address
          </label>
          <input 
            type="email" 
            required
            className="w-full bg-gray-800/50 border border-white/5 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-gray-800 transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
            Password
          </label>
          <input 
            type="password" 
            required
            className="w-full bg-gray-800/50 border border-white/5 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-gray-800 transition-all"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-violet-600/30 active:scale-95"
        >
          SIGN IN
        </button>
      </form>

      <p className="mt-8 text-center text-gray-500 text-sm">
        Don't have an account? 
        <button 
          onClick={() => navigate('/register')} 
          className="text-violet-400 font-bold ml-2 hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  </div>
</div>
  );
};

export default LoginPage;