
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, Camera, ArrowRight } from 'lucide-react';

const categories = ["All", "Streetwear", "Office", "Party", "Wedding", "Casual"];

const showcaseItems = [
  { id: 1, tag: "Streetwear", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800", title: "Neon Cyberpunk Layering", user: "Alex K." },
  { id: 2, tag: "Office", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800", title: "Modern Executive", user: "Sarah J." },
  { id: 3, tag: "Party", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800", title: "Gala Evening Wear", user: "Michael T." },
  { id: 4, tag: "Casual", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800", title: "Sunday Coffee Run", user: "Emma W." },
  { id: 5, tag: "Wedding", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800", title: "Summer Garden Guest", user: "David L." },
  { id: 6, tag: "Streetwear", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800", title: "Tokyo Drift", user: "Kenji R." },
  { id: 7, tag: "Office", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800", title: "Creative Director", user: "Lisa M." },
  { id: 8, tag: "Casual", image: "https://images.unsplash.com/photo-1503342217505-b0815a046baf?auto=format&fit=crop&q=80&w=800", title: "Minimalist Fall", user: "Sophie B." },
];

const ShowcasePage: React.FC = () => {
  const [filter, setFilter] = useState("All");

  const filteredItems = filter === "All" 
    ? showcaseItems 
    : showcaseItems.filter(item => item.tag === filter);

  return (
    <div className="w-full min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Community Looks</h1>
          <p className="text-gray-400">Explore outfit generations created by the FitGenius community.</p>
        </div>

        {/* Spotlight Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[21/9] md:aspect-[21/8]"
        >
          <img 
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop" 
            alt="Spotlight" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent flex flex-col justify-center p-8 md:p-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-sm font-bold w-fit mb-4">
              <Trophy className="w-4 h-4" />
              Look of the Week
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 max-w-lg">Spring Avant-Garde Collection</h2>
            <p className="text-gray-300 text-lg max-w-md mb-8">
              Curated by user @BellaStyle using the "Streetwear" mode. A perfect blend of comfort and high fashion.
            </p>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full w-fit hover:scale-105 transition-transform">
              View Breakdown
            </button>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-6 py-2 rounded-full border transition-all duration-300
                ${filter === cat 
                  ? 'bg-white text-black border-white font-bold' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/40'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-purple-500/50 transition-colors"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1 block">{item.tag}</span>
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">by {item.user}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <div className="glass-panel p-12 rounded-[2.5rem] text-center border border-white/10 relative overflow-hidden mb-20">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-purple-900/10 to-transparent -z-10" />
          <div className="inline-flex p-4 rounded-full bg-white/5 mb-6">
            <Camera className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Got a Great Generation?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Share your best AI-generated outfits with the community and stand a chance to be featured in our weekly spotlight.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-bold hover:shadow-[0_0_30px_rgba(122,58,255,0.4)] transition-all flex items-center gap-2 mx-auto">
            Submit Your Look <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShowcasePage;
