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
            initial={false}
            animate={isOpen ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
            className="fixed inset-y-0 right-0 w-[85%] bg-charcoal/98 backdrop-blur-2xl z-[60] flex flex-col p-12 border-l border-gold/20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-gold-light p-2 hover:rotate-90 transition-transform duration-300"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <div className="flex flex-col gap-8 mt-20">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-serif tracking-[0.1em] ${
                    location.pathname === link.path ? 'text-gold' : 'text-white'
                  }`}
                >
                  <motion.span
                    initial={{ x: 20, opacity: 0 }}
                    animate={isOpen ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
              <Link 
                to="/rooms" 
                onClick={() => setIsOpen(false)}
                className="btn-luxury text-center mt-12 py-5"
              >
                Reserve Now
              </Link>
            </div>

            <div className="mt-auto border-t border-gold/10 pt-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-bold">Contact Guest Services</p>
              <p className="text-gold-light font-serif text-lg">+91 562 223 0000</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
