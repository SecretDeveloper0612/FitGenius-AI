
import React from 'react';
import { Sparkles, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';
import { AppState } from '../types';

interface Props {
  onNavigate?: (state: AppState) => void;
}

const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-black border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate?.(AppState.Landing)}>
              <div className="relative">
                <Sparkles className="h-6 w-6 text-purple-500" />
                <div className="absolute inset-0 bg-purple-500 blur-lg opacity-40" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                FitGenius<span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Reinventing personal fashion with advanced computer vision and generative AI. Look your best, every single day.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon icon={<Instagram className="w-4 h-4" />} />
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
              <SocialIcon icon={<Github className="w-4 h-4" />} />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => onNavigate?.(AppState.Features)}>Features</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => onNavigate?.(AppState.Pricing)}>Pricing</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => onNavigate?.(AppState.Showcase)}>Showcase</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">API Access</li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-purple-400 cursor-pointer transition-colors" onClick={() => onNavigate?.(AppState.About)}>About Us</li>
              <li className="hover:text-purple-400 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-purple-400 cursor-pointer transition-colors" onClick={() => onNavigate?.(AppState.Blog)}>Blog</li>
              <li className="hover:text-purple-400 cursor-pointer transition-colors" onClick={() => onNavigate?.(AppState.Contact)}>Contact</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6">Stay in Style</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest trend reports and feature updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button className="bg-white text-black p-2 rounded-lg hover:bg-purple-200 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 FitGenius AI Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/20 hover:text-white transition-all cursor-pointer border border-white/5">
    {icon}
  </div>
);

export default Footer;
