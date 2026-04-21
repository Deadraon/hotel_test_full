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
          <>
            {/* Backdrop for closing */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden"
            />
            
            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[80%] bg-charcoal/95 backdrop-blur-2xl z-[60] flex flex-col p-10 border-l border-gold/20 shadow-2xl md:hidden"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="self-end text-gold p-2 hover:scale-110 transition-transform mb-12"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col space-y-8">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-serif tracking-[0.1em] transition-all ${
                      location.pathname === link.path ? 'text-gold pl-2 border-l-2 border-gold' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Link 
                  to="/rooms" 
                  onClick={() => setIsOpen(false)}
                  className="btn-luxury w-full text-center py-5 mt-10 !text-[10px]"
                >
                  Book Now
                </Link>
              </div>

              <div className="mt-auto pt-10 border-t border-white/5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2 font-bold">Inquiries</p>
                <p className="text-gold-light font-serif text-lg">+91 562 223 0000</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
