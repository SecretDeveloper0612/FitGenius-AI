
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="w-full min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Get in <span className="gradient-text">Touch</span></h1>
          <p className="text-gray-400">Have questions about the AI or partnerships? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Email Us</div>
                    <div className="text-gray-400">support@fitgenius.ai</div>
                    <div className="text-gray-400">partners@fitgenius.ai</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">HQ</div>
                    <div className="text-gray-400">101 Fashion District Blvd</div>
                    <div className="text-gray-400">San Francisco, CA 94103</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Call Us</div>
                    <div className="text-gray-400">+1 (555) 123-4567</div>
                    <div className="text-gray-500 text-sm">Mon-Fri, 9am-6pm PST</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5">
              <h3 className="font-bold mb-4">Partner with us?</h3>
              <p className="text-gray-400 text-sm mb-6">
                Are you a clothing retailer looking to reduce returns? Check out our Enterprise API documentation.
              </p>
              <button className="text-cyan-400 font-bold text-sm hover:underline">
                View API Docs →
              </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Subject</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-gray-400">
                   <option>General Inquiry</option>
                   <option>Support Request</option>
                   <option>Partnership</option>
                   <option>Press</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(122,58,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                {sent ? (
                  <>Sent Successfully!</>
                ) : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
