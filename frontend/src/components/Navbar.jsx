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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-charcoal/95 backdrop-blur-2xl z-[60] flex flex-col items-center justify-center space-y-8"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-gold p-4 hover:scale-110 transition-transform"
            >
              <X size={32} />
            </button>

            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-serif tracking-[0.2em] transition-colors ${
                  location.pathname === link.path ? 'text-gold' : 'text-white hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              to="/rooms" 
              onClick={() => setIsOpen(false)}
              className="btn-luxury px-12 py-5 mt-4"
            >
              Reserve Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
