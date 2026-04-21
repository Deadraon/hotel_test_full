import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { rooms } from '../utils/roomsData';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';

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
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white p-8 shadow-sm border border-gold/10 sticky top-28">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gold/10">
              <SlidersHorizontal size={18} className="text-gold" />
              <h3 className="font-bold text-sm uppercase tracking-widest">Filter By</h3>
            </div>

            <div className="mb-8">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-4">Room Type</label>
              <div className="space-y-3">
                {['All', 'Deluxe', 'Suite', 'Family', 'Honeymoon'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`block w-full text-left text-sm transition-colors hover:text-gold ${filterType === type ? 'text-gold font-bold' : 'text-charcoal/60'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-4">Max Price: ₹{maxPrice}</label>
              <input 
                type="range" 
                min="3000" 
                max="15000" 
                step="500" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal/40 mt-2 uppercase tracking-tighter">
                <span>₹3k</span>
                <span>₹15k</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Rooms Grid */}
        <div className="flex-grow">
          {filteredRooms.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredRooms.map((room, idx) => (
                <motion.div 
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
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 font-serif font-bold text-gold-dark shadow-lg">
                      ₹{room.price} <span className="text-[10px] uppercase tracking-tighter text-charcoal/50 font-sans">/ night</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">{room.type}</span>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-gold-dark transition-colors">{room.name}</h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed mb-6 line-clamp-2">{room.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {room.amenities.slice(0, 3).map(amenity => (
                        <span key={amenity} className="text-[10px] bg-cream px-3 py-1 uppercase tracking-widest text-charcoal/40 font-medium">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <Link to={`/room/${room.id}`} className="btn-luxury-outline w-full text-center block !py-3 !text-xs">
                      View Details & Book
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-gold/10">
              <Search className="mx-auto text-gold/20 mb-4" size={48} />
              <p className="text-charcoal/40 font-serif italic text-xl">No rooms found matching your criteria.</p>
              <button 
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
