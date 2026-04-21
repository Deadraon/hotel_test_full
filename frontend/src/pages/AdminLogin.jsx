import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('adminToken', res.data.token);
      toast.success("Login successful!");
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-20 flex items-center justify-center bg-cream min-h-screen">
      <div className="bg-white p-12 shadow-2xl border border-gold/10 w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Secure Access</span>
          <h1 className="text-3xl font-bold text-charcoal">Admin Portal</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={18} />
              <input 
                type="text" required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-cream/50 border border-gold/10 p-4 pl-12 text-sm focus:border-gold outline-none transition-all"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={18} />
              <input 
                type="password" required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-cream/50 border border-gold/10 p-4 pl-12 text-sm focus:border-gold outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-luxury w-full flex items-center justify-center gap-3 disabled:opacity-50 mt-8"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>

        <p className="text-[10px] text-center text-charcoal/40 mt-10 uppercase tracking-widest">
          Reserved for Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
