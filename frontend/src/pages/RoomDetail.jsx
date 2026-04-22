import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { rooms } from '../utils/roomsData';
import { Check, ArrowLeft, ShieldCheck, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { differenceInDays } from 'date-fns';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const MotionDiv = motion.div;

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === parseInt(id, 10));
  const today = new Date().toISOString().split('T')[0];
  
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
    const value = e.target.name === 'guests' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/bookings/book`, {
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
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{room.type}</span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-charcoal">{room.name}</h1>
              <p className="text-charcoal/50 uppercase tracking-widest text-xs font-semibold">
                {room.view} • {room.bedType} • Up to {room.maxGuests} Guests
              </p>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 md:h-[400px]">
              <div className="h-72 md:h-full rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
                <img src={room.image} alt={room.name} decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-rows-2 gap-4 h-72 md:h-full">
                <div className="md:rounded-tr-3xl overflow-hidden bg-charcoal flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=70&w=640&auto=format&fit=crop" alt={`${room.name} bathroom detail`} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="rounded-b-3xl md:rounded-br-3xl md:rounded-bl-none overflow-hidden bg-gold-dark flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=70&w=640&auto=format&fit=crop" alt={`${room.name} seating detail`} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-60" />
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
            <div className="bg-charcoal p-6 sm:p-10 shadow-2xl border border-gold/10 lg:sticky lg:top-28">
              <div className="mb-10 pb-8 border-b border-gold/20 flex justify-between items-end">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-bold">Price per night</span>
                  <span className="text-4xl font-serif font-bold text-gold-light">₹{room.price}</span>
                </div>
                <div className="flex gap-1 text-gold mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#B8975A" />)}
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-3">Guest Name</label>
                  <input 
                    type="text" name="name" required placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-gold/20 p-5 text-white text-sm focus:border-gold outline-none transition-all placeholder:text-white/10"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-3">Contact Details</label>
                  <div className="space-y-4">
                    <input 
                      type="email" name="email" required placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-gold/20 p-5 text-white text-sm focus:border-gold outline-none transition-all placeholder:text-white/10"
                    />
                    <input 
                      type="tel" name="phone" required placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-gold/20 p-5 text-white text-sm focus:border-gold outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-3">Check-In</label>
                    <input 
                      type="date" name="checkIn" required
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      min={today}
                      className="w-full bg-white/5 border border-gold/20 p-5 text-white text-sm focus:border-gold outline-none transition-all [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-3">Check-Out</label>
                    <input 
                      type="date" name="checkOut" required
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      min={formData.checkIn || today}
                      className="w-full bg-white/5 border border-gold/20 p-5 text-white text-sm focus:border-gold outline-none transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-3">Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-gold/20 p-5 text-white text-sm focus:border-gold outline-none transition-all [color-scheme:dark]"
                  >
                    {Array.from({ length: room.maxGuests }, (_, index) => index + 1).map((guestCount) => (
                      <option key={guestCount} value={guestCount}>
                        {guestCount} Guest{guestCount > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-3">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    rows="3"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full resize-none bg-white/5 border border-gold/20 p-5 text-white text-sm focus:border-gold outline-none transition-all placeholder:text-white/10"
                    placeholder="Arrival time, celebration notes, accessibility needs..."
                  ></textarea>
                </div>

                {formData.checkIn && formData.checkOut && (
                  <div className="bg-white/5 p-8 space-y-4 border border-gold/10">
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
                      <span>{nights} Night{nights > 1 ? 's' : ''} Stay</span>
                      <span className="text-white">₹{nights * room.price}</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                      <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold">Total Amount</span>
                      <span className="text-2xl font-serif font-bold text-white">₹{totalAmount}</span>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  aria-busy={loading}
                  className="btn-luxury w-full flex items-center justify-center gap-3 disabled:opacity-50 !py-6 text-xs"
                >
                  {loading ? "Securing Room..." : "Confirm Reservation"}
                </button>
              </form>
              
              <div className="mt-8 flex items-center justify-center gap-3 text-white/30">
                <ShieldCheck size={14} />
                <p className="text-[9px] uppercase tracking-[0.2em] font-bold">Secure SSL Encrypted Booking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
