import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Clock, Wifi, Waves, Utensils, Car, Wind, UserCheck, Heart, Dumbbell } from 'lucide-react';
import heroImage from '../assets/hero.png';

const Home = () => {

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${heroImage}')`,
            animation: 'zoomOut 20s linear infinite alternate'
          }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block border border-gold/40 px-6 py-2 uppercase tracking-[0.4em] text-[10px] font-semibold mb-8 backdrop-blur-sm"
          >
            Agra's Premier Luxury Hotel
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-8xl font-bold mb-8 leading-[1.1] md:leading-tight"
          >
            Experience <span className="text-gold italic font-normal">Timeless</span> <br /> Luxury
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-base md:text-xl font-light text-white mb-10 drop-shadow-md px-4"
          >
            A refined sanctuary just moments away from the magnificent Taj Mahal. Immerse yourself in Mughal-inspired elegance.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Link to="/rooms" className="btn-luxury w-full md:w-auto">Explore Rooms</Link>
            <button 
              onClick={() => document.getElementById('location').scrollIntoView({ behavior: 'smooth' })}
              className="btn-luxury-outline !text-white !border-white/60 hover:!border-white w-full md:w-auto"
            >
              Our Location
            </button>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold to-transparent"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-charcoal">
              Where Mughal Heritage <br /> Meets Modern Comfort
            </h2>
            <div className="w-16 h-1 bg-gold mb-8"></div>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              Taj View Residency stands as a testament to Agra's glorious past, offering guests an immersive experience into the world of Mughal grandeur. Our property is lovingly designed to reflect the architectural majesty that surrounds it.
            </p>
            <p className="text-charcoal/70 leading-relaxed mb-10">
              With an unobstructed view of the iconic Taj Mahal from select rooms and a warm, personalized service ethos, we ensure every stay becomes a cherished memory.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-4xl font-serif font-bold text-gold-dark block mb-2">25+</span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Years of Excellence</span>
              </div>
              <div>
                <span className="text-4xl font-serif font-bold text-gold-dark block mb-2">4.8★</span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Guest Rating</span>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-charcoal rounded-tl-[100px] overflow-hidden"
            >
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop" alt="Lobby" className="w-full h-full object-cover opacity-80" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gold-dark rounded-br-[100px] overflow-hidden mt-12"
            >
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop" alt="Pool" className="w-full h-full object-cover opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">World Class</span>
            <h2 className="text-4xl font-bold mb-4">Hotel Amenities</h2>
            <div className="w-16 h-1 bg-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Wifi />, name: "Free Wi-Fi" },
              { icon: <Waves />, name: "Swimming Pool" },
              { icon: <Utensils />, name: "Fine Dining" },
              { icon: <Car />, name: "Valet Parking" },
              { icon: <Wind />, name: "Air Conditioning" },
              { icon: <Clock />, name: "24/7 Reception" },
              { icon: <Heart />, name: "Spa & Wellness" },
              { icon: <Dumbbell />, name: "Fitness Centre" },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-8 border border-gold/20 hover:border-gold transition-all bg-white shadow-sm"
              >
                <div className="text-gold mb-4 p-4 rounded-full bg-cream shadow-inner">{item.icon}</div>
                <span className="text-sm font-bold tracking-widest uppercase text-charcoal">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Guest Voices</span>
            <h2 className="text-4xl font-bold mb-4 text-white">Guest Experiences</h2>
            <div className="w-16 h-1 bg-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                text: "The view of the Taj Mahal at sunrise from our suite was simply breathtaking. The staff's hospitality was unmatched.",
                author: "Priya & Rahul Sharma",
                room: "Honeymoon Suite"
              },
              { 
                text: "An extraordinary property. The Mughal architecture and the attention to detail made this our most memorable vacation.",
                author: "The Mehta Family",
                room: "Family Suite"
              },
              { 
                text: "Perfect location, flawless service, and a room that genuinely takes your breath away. Finest hotel in India.",
                author: "James Whitfield",
                room: "Royal Deluxe Room"
              }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white/5 p-10 backdrop-blur-sm border border-white/10"
              >
                <div className="flex gap-1 text-gold mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#B8975A" />)}
                </div>
                <p className="text-xl font-serif italic mb-8 text-white/90 leading-relaxed">"{review.text}"</p>
                <div className="border-t border-white/10 pt-6">
                  <span className="block font-bold tracking-widest text-xs uppercase mb-1">{review.author}</span>
                  <span className="text-[10px] text-gold uppercase tracking-widest">{review.room}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="location" className="py-24 bg-cream">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Find Us</span>
            <h2 className="text-4xl font-bold mb-8 text-charcoal">Unrivaled Location</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-white p-3 shadow-sm text-gold h-fit"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Address</h4>
                  <p className="text-charcoal/60 text-sm">Taj Ganj, Agra, Uttar Pradesh 282001, India</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-white p-3 shadow-sm text-gold h-fit"><Phone size={24} /></div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Phone</h4>
                  <p className="text-charcoal/60 text-sm">+91 562 223 0000</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-white p-3 shadow-sm text-gold h-fit"><Mail size={24} /></div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Email</h4>
                  <p className="text-charcoal/60 text-sm">reservations@tajviewresidency.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[450px] w-full bg-white shadow-2xl p-2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14192.189543839!2d78.034831!3d27.173891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121d702ff6d%3A0xdd2ae4803f767dde!2sTaj%20Mahal!5e0!3m2!1sen!2sin!4v1700000000000" 
              className="w-full h-full border-0"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/915622230000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Phone fill="white" size={24} />
      </a>
    </div>
  );
};

export default Home;
