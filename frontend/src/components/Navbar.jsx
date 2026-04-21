import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50 || location.pathname !== '/');
    handleScroll(); // Initialize
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms & Suites', path: '/rooms' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex flex-col">
          <span className={`font-serif text-2xl font-bold tracking-[0.2em] leading-none ${scrolled ? 'text-gold-dark' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]'}`}>TAJ VIEW</span>
          <span className={`text-[10px] uppercase tracking-[0.5em] mt-1 ${scrolled ? 'text-charcoal/60' : 'text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'}`}>Residency • Agra</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all hover:text-gold ${
                location.pathname === link.path 
                  ? (scrolled ? 'text-gold-dark border-b border-gold-dark' : 'text-gold border-b border-gold') 
                  : scrolled ? 'text-charcoal' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/rooms" className="btn-luxury text-xs !py-2.5">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} className={scrolled ? 'text-gold-dark' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-charcoal/90 backdrop-blur-2xl z-[60] flex flex-col p-10 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex flex-col">
                <span className="text-xl font-bold tracking-[0.4em] text-white">TAJ VIEW</span>
                <span className="text-[8px] tracking-[0.5em] text-gold-light uppercase">Residency · Agra</span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gold p-2 hover:scale-110 transition-transform"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col space-y-10">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-serif tracking-[0.2em] transition-all ${
                    location.pathname === link.path ? 'text-gold' : 'text-white/80'
                  }`}
                >
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
              
              <Link 
                to="/rooms" 
                onClick={() => setIsOpen(false)}
                className="btn-luxury w-full text-center py-6 mt-10 !text-[10px]"
              >
                Book Your Stay
              </Link>
            </div>

            <div className="mt-auto pb-10 border-t border-white/10 pt-10">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2 font-bold">Reservations</p>
                  <p className="text-gold-light font-serif text-xl">+91 562 223 0000</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2 font-bold">Location</p>
                  <p className="text-white font-serif">Taj Ganj, Agra</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
