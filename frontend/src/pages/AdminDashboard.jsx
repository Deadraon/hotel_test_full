import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, ExternalLink, Calendar, User, Phone, Mail, LogOut, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, messagesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/bookings`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/contact`)
      ]);
      setBookings(bookingsRes.data);
      setMessages(messagesRes.data);
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
      toast.success("Booking deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) return <div className="pt-40 text-center">Loading Dashboard...</div>;

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-2 block">Management</span>
            <h1 className="text-4xl font-bold text-charcoal">Admin Dashboard</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-red-500 hover:text-red-700 transition-colors"
          >
            Logout <LogOut size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-gold/10">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`pb-4 text-xs uppercase tracking-widest font-bold transition-all ${activeTab === 'bookings' ? 'text-gold border-b-2 border-gold' : 'text-charcoal/40'}`}
          >
            Bookings ({bookings.length})
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`pb-4 text-xs uppercase tracking-widest font-bold transition-all ${activeTab === 'messages' ? 'text-gold border-b-2 border-gold' : 'text-charcoal/40'}`}
          >
            Messages ({messages.length})
          </button>
        </div>

        {activeTab === 'bookings' ? (
          <div className="space-y-6">
            {bookings.length > 0 ? bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-8 border border-gold/10 shadow-sm flex flex-col md:flex-row justify-between gap-8 hover:border-gold/30 transition-all">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Guest Information</h4>
                    <p className="font-bold text-charcoal flex items-center gap-2"><User size={14} className="text-gold" /> {booking.name}</p>
                    <p className="text-sm text-charcoal/60 flex items-center gap-2"><Mail size={14} className="text-gold/50" /> {booking.email}</p>
                    <p className="text-sm text-charcoal/60 flex items-center gap-2"><Phone size={14} className="text-gold/50" /> {booking.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Room & Dates</h4>
                    <p className="font-bold text-charcoal">{booking.roomName}</p>
                    <p className="text-sm text-charcoal/60 flex items-center gap-2">
                      <Calendar size={14} className="text-gold/50" /> 
                      {format(new Date(booking.checkIn), 'MMM d')} - {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gold-dark mt-1">Ref: {booking.bookingRef}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Status & Amount</h4>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={14} className="text-green-500" />
                      <span className="text-sm font-bold text-green-600 uppercase tracking-widest">Confirmed</span>
                    </div>
                    <p className="text-xl font-serif font-bold text-charcoal">₹{booking.totalAmount}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => deleteBooking(booking._id)}
                    className="p-4 text-red-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )) : (
              <p className="text-center py-20 bg-white border border-gold/10 italic text-charcoal/40">No bookings found.</p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {messages.length > 0 ? messages.map((msg) => (
              <div key={msg._id} className="bg-white p-8 border border-gold/10 shadow-sm hover:border-gold/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gold mb-1">{msg.subject}</h4>
                    <h3 className="text-lg font-bold text-charcoal">{msg.name}</h3>
                    <p className="text-xs text-charcoal/40 uppercase tracking-widest">{msg.email} • {msg.phone}</p>
                  </div>
                  <span className="text-[10px] text-charcoal/30 uppercase font-bold">{format(new Date(msg.createdAt), 'MMM d, h:mm a')}</span>
                </div>
                <p className="text-charcoal/70 bg-cream/50 p-6 border-l-2 border-gold italic leading-relaxed">"{msg.message}"</p>
              </div>
            )) : (
              <p className="text-center py-20 bg-white border border-gold/10 italic text-charcoal/40">No messages found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
