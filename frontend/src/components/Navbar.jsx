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
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
      document.documentElement.style.overflow = 'unset';
    };
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

      {/* Mobile Menu Dropdown (Light Theme) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white/20 backdrop-blur-3xl border-y border-white/20 p-10 flex flex-col space-y-8 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-[0.3em] font-bold text-charcoal border-b border-black/5 pb-4 transition-all hover:text-gold hover:pl-2"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/rooms" 
              onClick={() => setIsOpen(false)} 
              className="btn-luxury text-center mt-6 !py-5 shadow-xl"
            >
              Book Your Stay
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
