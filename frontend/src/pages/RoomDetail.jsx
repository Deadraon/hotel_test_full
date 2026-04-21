import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { rooms } from '../utils/roomsData';
import { Check, ArrowLeft, Calendar, Users, Info, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format, differenceInDays } from 'date-fns';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === parseInt(id));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);

  if (!room) return <div className="pt-40 text-center">Room not found</div>;

  const nights = formData.checkIn && formData.checkOut 
    ? Math.max(1, differenceInDays(new Date(formData.checkOut), new Date(formData.checkIn))) 
    : 1;
  const totalAmount = nights * room.price;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings/book`, {
        ...formData,
        roomId: room.id,
        roomName: room.name,
        totalAmount
      });
      toast.success("Booking Confirmed! Check your email.");
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-cream min-h-screen">
      <div className="container mx-auto px-6">
        <Link to="/rooms" className="flex items-center gap-2 text-gold-dark hover:gap-4 transition-all uppercase tracking-widest text-xs font-bold mb-12">
          <ArrowLeft size={16} /> Back to Rooms
        </Link>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{room.type}</span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-charcoal">{room.name}</h1>
              <p className="text-charcoal/50 uppercase tracking-widest text-xs font-semibold">
                {room.view} • {room.bedType} • Up to {room.maxGuests} Guests
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 h-[400px]">
              <div className="h-full rounded-l-3xl overflow-hidden">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="rounded-tr-3xl overflow-hidden bg-charcoal flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop" alt="Detail 1" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="rounded-br-3xl overflow-hidden bg-gold-dark flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop" alt="Detail 2" className="w-full h-full object-cover opacity-60" />
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">About This Room</h2>
              <p className="text-charcoal/70 leading-relaxed text-lg font-light mb-8">{room.longDesc}</p>
              
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="text-gold" /> Room Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {room.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-3 bg-white p-4 border border-gold/5 shadow-sm">
                    <Check size={16} className="text-gold" />
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-gold/5 border-l-4 border-gold">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gold-dark mb-4">Hotel Policies</h4>
              <ul className="text-sm text-charcoal/60 space-y-2 list-disc ml-4">
                <li>Check-in: 2:00 PM • Check-out: 11:00 AM</li>
                <li>Free high-speed Wi-Fi throughout the property</li>
                <li>Complimentary mineral water and coffee/tea station</li>
                <li>Free cancellation up to 48 hours before arrival</li>
              </ul>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 shadow-2xl border border-gold/10 sticky top-28">
              <div className="mb-8 pb-8 border-b border-gold/10">
                <span className="text-3xl font-serif font-bold text-charcoal">₹{room.price}</span>
                <span className="text-charcoal/40 text-xs uppercase tracking-widest ml-2">/ night</span>
              </div>

              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Full Name</label>
                  <input 
                    type="text" name="name" required placeholder="John Doe"
                    onChange={handleInputChange}
                    className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Email Address</label>
                  <input 
                    type="email" name="email" required placeholder="john@example.com"
                    onChange={handleInputChange}
                    className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Phone Number</label>
                  <input 
                    type="tel" name="phone" required placeholder="+91 00000 00000"
                    onChange={handleInputChange}
                    className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Check-In</label>
                    <input 
                      type="date" name="checkIn" required
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Check-Out</label>
                    <input 
                      type="date" name="checkOut" required
                      onChange={handleInputChange}
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Guests</label>
                  <select 
                    name="guests" 
                    onChange={handleInputChange}
                    className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all cursor-pointer"
                  >
                    {[...Array(room.maxGuests)].map((_, i) => (
                      <option key={i} value={i+1}>{i+1} Guest{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {formData.checkIn && formData.checkOut && (
                  <div className="bg-cream p-6 space-y-3">
                    <div className="flex justify-between text-xs uppercase tracking-widest font-semibold text-charcoal/60">
                      <span>{nights} Night{nights > 1 ? 's' : ''} x ₹{room.price}</span>
                      <span>₹{nights * room.price}</span>
                    </div>
                    <div className="flex justify-between text-xs uppercase tracking-widest font-semibold text-charcoal/60">
                      <span>Service Charge</span>
                      <span>₹0</span>
                    </div>
                    <div className="border-t border-gold/10 pt-3 flex justify-between font-bold text-charcoal">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-luxury w-full flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Confirm Booking"}
                </button>
              </form>
              
              <p className="text-[10px] text-center text-charcoal/40 mt-6 uppercase tracking-[0.2em] font-medium">
                Protected by Secure Reservation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
