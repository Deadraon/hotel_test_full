import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Room Enquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', phone: '', subject: 'Room Enquiry', message: '' });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-cream min-h-screen">
      <div className="bg-charcoal py-20 mb-16">
        <div className="container mx-auto px-6 text-center">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Get In Touch</span>
          <h1 className="text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-charcoal">We'd love to hear from you</h2>
            <p className="text-charcoal/60 mb-12 leading-relaxed text-lg">
              Whether you're planning a wedding, a corporate retreat, or a simple weekend getaway, our team is here to ensure your stay at Taj View Residency is flawless.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                { icon: <MapPin />, title: "Address", content: "Taj Ganj, Agra, UP 282001" },
                { icon: <Phone />, title: "Phone", content: "+91 562 223 0000" },
                { icon: <Mail />, title: "Email", content: "reservations@tajview.com" },
                { icon: <Clock />, title: "Hours", content: "Reception: 24/7" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 border border-gold/10 shadow-sm flex flex-col items-center text-center">
                  <div className="text-gold mb-4">{item.icon}</div>
                  <h4 className="font-bold text-[10px] uppercase tracking-widest mb-2 text-charcoal/40">{item.title}</h4>
                  <p className="text-sm font-semibold">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="h-[300px] w-full border border-gold/10 grayscale contrast-125">
              <iframe 
                title="Map showing Taj View Residency contact location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14192.189543839!2d78.034831!3d27.173891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121d702ff6d%3A0xdd2ae4803f767dde!2sTaj%20Mahal!5e0!3m2!1sen!2sin!4v1700000000000" 
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-12 shadow-2xl border border-gold/10">
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Your Name</label>
                  <input 
                    type="text" name="name" required value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Email Address</label>
                  <input 
                    type="email" name="email" required value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Phone (Optional)</label>
                  <input 
                    type="tel" name="phone" value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Subject</label>
                  <select 
                    name="subject" value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all cursor-pointer"
                  >
                    <option>Room Enquiry</option>
                    <option>Group Booking</option>
                    <option>Wedding & Events</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-2">Your Message</label>
                <textarea 
                  name="message" required rows="6" value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-cream/50 border border-gold/10 p-4 text-sm focus:border-gold outline-none transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                aria-busy={loading}
                className="btn-luxury w-full flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? "Sending..." : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
