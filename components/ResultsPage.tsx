import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, Share2, RefreshCw, ShoppingCart, 
  ChevronRight, ExternalLink, Palette 
} from 'lucide-react';
import { 
  UserAnalysis, OutfitRecommendation, StyleMode 
} from '../types';
import { STYLE_MODES } from '../constants';
import * as GeminiService from '../services/geminiService';

interface Props {
  analysis: UserAnalysis;
  initialOutfit?: OutfitRecommendation;
  originalImage: string; // Keep reference if needed for specialized generation
}

const ResultsPage: React.FC<Props> = ({ analysis, initialOutfit, originalImage }) => {
  const [activeStyle, setActiveStyle] = useState<StyleMode>(StyleMode.Office);
  const [outfit, setOutfit] = useState<OutfitRecommendation | null>(initialOutfit || null);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // If no initial outfit, generate one on mount
  useEffect(() => {
    if (!outfit) {
      handleStyleChange(StyleMode.Office);
    }
  }, []);

  const handleStyleChange = async (style: StyleMode) => {
    setActiveStyle(style);
    setLoading(true);
    setOutfit(null);
    setGeneratedImage(null);
    
    try {
      const newOutfit = await GeminiService.generateOutfitRecommendation(analysis, style);
      setOutfit(newOutfit);
      // Pass the style to generation for environment context
      generateImage(newOutfit.visualPrompt, style);
    } catch (err) {
      console.error(err);
      alert("Failed to generate outfit. Please check API key.");
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async (prompt: string, style: StyleMode) => {
    setImageLoading(true);
    try {
      const imgData = await GeminiService.generateOutfitImage(prompt, style, originalImage);
      setGeneratedImage(imgData);
    } catch (err) {
      console.error("Image generation failed", err);
    } finally {
      setImageLoading(false);
    }
  };

  const handleExport = async () => {
    if (contentRef.current && (window as any).html2canvas) {
      const canvas = await (window as any).html2canvas(contentRef.current, {
        backgroundColor: '#050505',
        scale: 2
      });
      const link = document.createElement('a');
      link.download = `FitGenius-${activeStyle}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } else {
      alert("Export library loading... try again in a second.");
    }
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-12 px-4 md:px-8">
      
      {/* Top Controls: Style Selector */}
      <div className="max-w-7xl mx-auto mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-3">
          {STYLE_MODES.map((mode) => (
            <motion.button
              key={mode.id}
              onClick={() => handleStyleChange(mode.id)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: activeStyle === mode.id 
                  ? "0 0 30px rgba(122,58,255,0.6)" 
                  : "0 0 15px rgba(122,58,255,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className={`
                whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium
                border flex items-center gap-2 transition-colors duration-200
                ${activeStyle === mode.id 
                  ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(122,58,255,0.4)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-purple-500/50 hover:text-white'}
              `}
            >
              {mode.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8" ref={contentRef}>
        
        {/* Left Column: Visuals */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Outfit Preview Card */}
          <motion.div 
            layout
            className="aspect-[3/4] rounded-3xl bg-gray-900 border border-white/10 relative overflow-hidden group shadow-2xl"
          >
            {imageLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-sm z-10">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"/>
                <span className="text-purple-300 text-sm font-mono animate-pulse">RENDERING 8K PREVIEW...</span>
              </div>
            ) : generatedImage ? (
              <img 
                src={generatedImage} 
                alt="AI Outfit Preview" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 bg-black">
                <span className="text-xs">Preview Area</span>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
               <h2 className="text-2xl font-bold text-white mb-1">{outfit?.styleName || "Loading Style..."}</h2>
               <p className="text-sm text-gray-300 line-clamp-2">{outfit?.description}</p>
            </div>
          </motion.div>

          {/* Analysis Summary */}
          <div className="p-6 rounded-2xl glass-panel border border-white/5">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4" /> Personal Profile
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-gray-500 text-xs">Body Shape</span>
                <span className="font-medium">{analysis.bodyShape}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs">Undertone</span>
                <span className="font-medium">{analysis.skinTone}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-gray-500 text-xs mb-1">Recommended Palette</span>
                <div className="flex gap-2">
                  {outfit?.colorPalette?.map((color, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="w-8 h-8 rounded-full border border-white/20 shadow-lg"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    </div>
                  ))}
                  {(!outfit?.colorPalette || outfit.colorPalette.length === 0) && (
                     <span className="text-gray-600 italic">Generating...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations */}
        <div className="lg:col-span-7 space-y-6">
          
          {loading ? (
             <div className="space-y-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />
               ))}
             </div>
          ) : (
            <div className="space-y-4">
              {outfit?.items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.06] transition-all flex gap-4"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-black/40 flex items-center justify-center text-2xl border border-white/5">
                    {item.type === 'Top' ? '👕' : item.type === 'Bottom' ? '👖' : item.type === 'Shoes' ? '👟' : '👜'}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors truncate">
                        {item.name}
                      </h4>
                      <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-400">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                    
                    <div className="mt-3 flex items-center gap-3">
                      <a 
                        href={`https://www.google.com/search?q=${encodeURIComponent(item.shoppingQuery)}&tbm=shop`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wide"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Buy Similar
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
            <button 
              onClick={() => handleStyleChange(activeStyle)}
              disabled={loading}
              className="flex-1 px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Regenerate Outfit
            </button>
            
            <button 
              onClick={handleExport}
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-5 h-5" />
              Save Look
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;