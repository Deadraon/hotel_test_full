import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { rooms } from '../utils/roomsData';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';

const MotionDiv = motion.div;

const Rooms = () => {
  const [filterType, setFilterType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(15000);

  const filteredRooms = rooms.filter(room => {
    if (filterType !== 'All' && room.type !== filterType) return false;
    if (room.price > maxPrice) return false;
    return true;
  });

  return (
    <div className="pt-24 pb-24 bg-cream">
      <div className="bg-charcoal py-20 mb-16">
        <div className="container mx-auto px-6">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Accommodations</span>
          <h1 className="text-5xl font-bold text-white">Rooms & Suites</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-charcoal p-6 sm:p-10 shadow-2xl border border-gold/10 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gold/20">
              <SlidersHorizontal size={20} className="text-gold" />
              <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-white">Filter</h3>
            </div>
 
            <div className="mb-10">
              <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-6">Room Type</label>
              <div className="space-y-4">
                {['All', 'Deluxe', 'Suite', 'Family', 'Honeymoon'].map(type => (
                  <button 
                    type="button"
                    key={type}
                    onClick={() => setFilterType(type)}
                    aria-pressed={filterType === type}
                    className={`block w-full text-left text-sm uppercase tracking-widest transition-all hover:text-gold ${filterType === type ? 'text-gold font-bold translate-x-2' : 'text-white/60'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-6">Max Budget: <span className="text-gold">₹{maxPrice}</span></label>
              <input 
                type="range" 
                min="3000" 
                max="15000" 
                step="500" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                aria-label="Maximum room budget"
                className="w-full accent-gold cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              />
              <div className="flex justify-between text-[10px] text-white/30 mt-4 uppercase tracking-tighter">
                <span>₹3,000</span>
                <span>₹15,000</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Rooms Grid */}
        <div className="flex-grow">
          {filteredRooms.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredRooms.map((room, idx) => (
                <MotionDiv
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white group overflow-hidden border border-gold/5 hover:border-gold/20 transition-all shadow-sm hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 font-serif font-bold text-gold-dark shadow-lg">
                      ₹{room.price} <span className="text-[10px] uppercase tracking-tighter text-charcoal/50 font-sans">/ night</span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-10 bg-white">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                      <div>
                        <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">{room.type}</span>
                        <h3 className="text-2xl font-bold text-charcoal group-hover:text-gold transition-colors">{room.name}</h3>
                      </div>
                      <div className="text-right">
                        <span className="block text-gold-dark font-serif text-3xl font-bold leading-none">₹{room.price}</span>
                        <span className="text-[10px] uppercase tracking-widest text-charcoal/30">per night</span>
                      </div>
                    </div>
                    
                    <p className="text-charcoal/60 text-sm leading-relaxed mb-8 line-clamp-2">{room.description}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-gold/5">
                      {room.amenities.slice(0, 4).map(amenity => (
                        <span key={amenity} className="text-[9px] border border-gold/10 px-4 py-1.5 uppercase tracking-[0.15em] text-charcoal/60 font-bold group-hover:border-gold/30 transition-all">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <Link to={`/room/${room.id}`} className="btn-luxury w-full text-center block !py-5 !text-[10px]">
                      Check Availability
                    </Link>
                  </div>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-gold/10">
              <Search className="mx-auto text-gold/20 mb-4" size={48} />
              <p className="text-charcoal/40 font-serif italic text-xl">No rooms found matching your criteria.</p>
              <button 
                type="button"
                onClick={() => { setFilterType('All'); setMaxPrice(15000); }}
                className="text-gold font-bold uppercase tracking-widest text-xs mt-6 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
