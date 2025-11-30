
import React from 'react';
import { Sparkles } from 'lucide-react';
import { AppState } from '../types';

interface Props {
  onNavigate: (state: AppState) => void;
  appState: AppState;
}

const Navigation: React.FC<Props> = ({ onNavigate, appState }) => {
  const navItems = [
    { label: 'Features', state: AppState.Features },
    { label: 'Showcase', state: AppState.Showcase },
    { label: 'Pricing', state: AppState.Pricing },
    { label: 'Blog', state: AppState.Blog },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate(AppState.Landing)}
          >
            <div className="relative">
              <Sparkles className="h-8 w-8 text-purple-500 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-purple-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              FitGenius<span className="text-cyan-400">AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.state)}
                className={`text-sm font-medium transition-colors relative group ${
                  appState === item.state ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {appState === item.state && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                )}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white/50 transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
              </button>
            ))}

            <button 
              onClick={() => onNavigate(AppState.Auth)} 
              className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
