import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await axios.post('https://myanimelist-cd1p.onrender.com/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // 2. Success Handshake
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      
      navigate('/'); 
    } catch (err) {
    // 1. Log the full error to the console for you to see
    console.error("DEBUGGING ERROR:", err);

    // 2. Show the ACTUAL message from the backend or the JS crash
    const message = err.response?.data?.message || err.message;
    alert("Real Error: " + message);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      {/* Decorative Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white mb-3 tracking-tighter">Create Account</h2>
          <p className="text-gray-400 text-sm font-medium">Join thousands of anime fans today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Username</label>
            <input 
              type="text" 
              required
              placeholder="otaku_prime"
              className="w-full bg-gray-800/40 border border-white/5 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-gray-800/80 transition-all"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="you@example.com"
              className="w-full bg-gray-800/40 border border-white/5 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-gray-800/80 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-gray-800/40 border border-white/5 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-gray-800/80 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1">Confirm Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className={`w-full bg-gray-800/40 border border-white/5 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                formData.confirmPassword && formData.password !== formData.confirmPassword 
                ? 'focus:ring-red-500' 
                : 'focus:ring-violet-500'
              }`}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-violet-600/30 active:scale-95 mt-4"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Already a member? 
          <button 
            onClick={() => navigate('/login')} 
            className="text-violet-400 font-bold ml-2 hover:text-violet-300 transition-colors"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;