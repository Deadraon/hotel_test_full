import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;
const MotionAside = motion.aside;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Background scrolled state
      setScrolled(window.scrollY > 50 || location.pathname !== '/');
      
      // Hide on scroll down, show on scroll up
      if (window.scrollY > lastScrollY && window.scrollY > 200) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, location.pathname]);

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

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms & Suites', path: '/rooms' },
    { name: 'Contact', path: '/contact' },
  ];

  const mobileNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms & Suites', path: '/rooms' },
    { name: 'Experiences', path: '/rooms' },
    { name: 'Offers', path: '/rooms' },
    {
      name: 'Memberships',
      children: [
        { name: 'Rewards Program', path: '/rooms' },
        { name: 'Member Benefits', path: '/contact' },
        { name: 'Join The Club', path: '/contact' },
      ],
    },
    { name: 'Dining', path: '/rooms' },
    { name: 'Weddings', path: '/contact' },
    { name: 'Wellness', path: '/rooms' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedItem(null);
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: 18 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.12 + index * 0.045,
        duration: 0.36,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'} ${showNavbar ? 'translate-y-0' : '-translate-y-full opacity-0'}`}>
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
        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="md:hidden text-gold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} className={scrolled ? 'text-gold-dark' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            className="fixed inset-0 z-[70] md:hidden bg-charcoal/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={closeMenu}
          >
            <MotionAside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute inset-0 flex min-h-[100dvh] flex-col overflow-y-auto bg-[#fffdf8] text-charcoal shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-gold/15 bg-[#fffdf8]/95 px-7 py-6 backdrop-blur-xl">
                <Link to="/" onClick={closeMenu} className="mr-auto flex flex-col">
                  <span className="font-serif text-3xl font-bold leading-none tracking-[0.22em] text-gold-dark">TAJ</span>
                  <span className="mt-1 text-[9px] uppercase tracking-[0.42em] text-charcoal/55">View Residency</span>
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.22em] text-gold-dark transition-colors hover:text-gold"
                >
                  Login / Join
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                  className="grid h-11 w-11 place-items-center text-gold-dark transition-colors hover:text-charcoal"
                >
                  <X size={30} strokeWidth={1.4} />
                </button>
              </header>

              <div className="flex flex-1 flex-col px-7 pb-8 pt-8">
                <div className="flex flex-col gap-[18px]">
                  {mobileNavLinks.map((link, index) => {
                    const isExpanded = expandedItem === link.name;

                    if (link.children) {
                      return (
                        <MotionDiv
                          key={link.name}
                          custom={index}
                          variants={menuItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="border-b border-gold/10 pb-1"
                        >
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            onClick={() => setExpandedItem(isExpanded ? null : link.name)}
                            className="flex w-full items-center justify-between py-2 text-left text-[15px] font-medium uppercase tracking-[0.28em] text-gold-dark transition-all duration-300 hover:translate-x-1 hover:text-charcoal"
                          >
                            <span>{link.name}</span>
                            <ChevronDown
                              size={18}
                              strokeWidth={1.5}
                              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <MotionDiv
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-3 pb-4 pt-2">
                                  {link.children.map((child) => (
                                    <Link
                                      key={child.name}
                                      to={child.path}
                                      onClick={closeMenu}
                                      className="pl-4 text-[12px] font-medium uppercase tracking-[0.24em] text-charcoal/55 transition-all duration-300 hover:translate-x-1 hover:text-gold-dark"
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              </MotionDiv>
                            )}
                          </AnimatePresence>
                        </MotionDiv>
                      );
                    }

                    return (
                      <MotionDiv
                        key={link.name}
                        custom={index}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          to={link.path}
                          onClick={closeMenu}
                          className="block py-2 text-[15px] font-medium uppercase tracking-[0.28em] text-gold-dark transition-all duration-300 hover:translate-x-1 hover:text-charcoal"
                        >
                          {link.name}
                        </Link>
                      </MotionDiv>
                    );
                  })}
                </div>

                <div className="mt-auto flex flex-col gap-4 border-t border-gold/15 pt-8">
                  <Link
                    to="/rooms"
                    onClick={closeMenu}
                    className="btn-luxury w-full !py-4 text-center"
                  >
                    Book Your Stay
                  </Link>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] font-medium uppercase tracking-[0.2em] text-charcoal/45">
                    <Link to="/rooms" onClick={closeMenu} className="transition-colors hover:text-gold-dark">
                      Manage Booking
                    </Link>
                    <Link to="/contact" onClick={closeMenu} className="transition-colors hover:text-gold-dark">
                      Reservations
                    </Link>
                    <Link to="/contact" onClick={closeMenu} className="transition-colors hover:text-gold-dark">
                      Help
                    </Link>
                  </div>
                </div>
              </div>
            </MotionAside>
          </MotionDiv>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
