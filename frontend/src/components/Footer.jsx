import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Home } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-10 border-t border-gold/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex flex-col mb-8">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] leading-none text-gold-light">TAJ VIEW</span>
              <span className="text-[10px] uppercase tracking-[0.5em] mt-1 text-white/40">Residency • Agra</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              A sanctuary of luxury and tranquility in the shadow of the world's most iconic monument. Experience the timeless charm of Agra at Taj View Residency.
            </p>
            <div className="flex gap-4">
              <span className="text-gold font-bold text-[10px] uppercase tracking-widest">Luxury • Comfort • Heritage</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-gold">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/rooms" className="hover:text-gold transition-colors">Rooms & Suites</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/admin/login" className="hover:text-gold transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-gold">Our Services</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li>Fine Dining</li>
              <li>Spa & Wellness</li>
              <li>Wedding Events</li>
              <li>Airport Transfers</li>
              <li>Guided Taj Tours</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-gold">Contact Info</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex gap-3"><MapPin size={18} className="text-gold flex-shrink-0" /> Taj Ganj, Agra, UP 282001</li>
              <li className="flex gap-3"><Phone size={18} className="text-gold flex-shrink-0" /> +91 562 223 0000</li>
              <li className="flex gap-3"><Mail size={18} className="text-gold flex-shrink-0" /> reservations@tajview.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:row-reverse justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/30">
            © 2025 Taj View Residency. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
