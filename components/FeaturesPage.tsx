
import React from 'react';
import { motion } from 'framer-motion';
import { Scan, Palette, Shirt, Zap, Smartphone, Globe, Shield, CheckCircle2, XCircle } from 'lucide-react';

const features = [
  {
    icon: <Scan className="w-8 h-8 text-cyan-400" />,
    title: "Computer Vision Analysis",
    description: "Our proprietary AI model maps 85+ body keypoints to determine your exact morphology (Hourglass, Triangle, Rectangle, etc.) with 98% accuracy."
  },
  {
    icon: <Palette className="w-8 h-8 text-purple-400" />,
    title: "Seasonal Color Theory",
    description: "Are you a Winter Deep or a Summer Soft? We extract skin undertones, hair, and eye color to build your perfect palette."
  },
  {
    icon: <Shirt className="w-8 h-8 text-pink-400" />,
    title: "Virtual Try-On (Beta)",
    description: "Visualize outfits before you buy. Our generative engine renders high-fidelity previews of you wearing the suggested items."
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Occasion Matching",
    description: "From 'Corporate Boardroom' to 'Beach Wedding', switch modes instantly to get context-aware recommendations."
  },
  {
    icon: <Globe className="w-8 h-8 text-green-400" />,
    title: "Global Shopping Graph",
    description: "We connect the look to reality. Get direct shopping links to Amazon, Zara, H&M, and local boutiques matching the style."
  },
  {
    icon: <Smartphone className="w-8 h-8 text-blue-400" />,
    title: "Mobile First Design",
    description: "Your stylist in your pocket. Export your looks, save your wardrobe, and take your digital closet anywhere."
  }
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Beyond Simple <span className="gradient-text">Matching</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            FitGenius AI combines advanced computer vision with generative styling to deliver a personal stylist experience previously reserved for celebrities.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-3xl glass-panel border border-white/5 hover:border-purple-500/30 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors shadow-lg shadow-black/50">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Go Digital?</h2>
            <p className="text-gray-400">See how FitGenius compares to traditional personal styling.</p>
          </div>
          
          <div className="overflow-hidden rounded-3xl border border-white/10 glass-panel">
            <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/5 font-bold">
              <div className="text-gray-400">Feature</div>
              <div className="text-center">Traditional Stylist</div>
              <div className="text-center text-cyan-400">FitGenius AI</div>
            </div>
            {[
              { label: "Cost", trad: "$200 - $500 / session", ai: "From Free / $9.99 mo" },
              { label: "Time to Result", trad: "3 - 5 Days", ai: "< 30 Seconds" },
              { label: "Availability", trad: "Appointment Only", ai: "24/7 On-Demand" },
              { label: "Visual Preview", trad: "Moodboards (Abstract)", ai: "Generative Try-On (Realistic)" },
              { label: "Wardrobe Memory", trad: "Manual Notes", ai: "Digital Inventory Database" }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center">
                <div className="font-medium">{row.label}</div>
                <div className="text-center text-gray-500">{row.trad}</div>
                <div className="text-center font-bold text-white">{row.ai}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-cyan-900/40 z-10" />
               <img 
                 src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop" 
                 alt="Fashion Analysis" 
                 className="w-full h-full object-cover grayscale opacity-60"
               />
               
               {/* Overlay UI Elements */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-10 left-10 z-20 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10"
               >
                 <div className="text-xs text-gray-400 mb-1">CONFIDENCE SCORE</div>
                 <div className="text-2xl font-bold text-green-400">98.4%</div>
               </motion.div>

               <motion.div 
                 animate={{ y: [0, 10, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-10 right-10 z-20 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10"
               >
                 <div className="text-xs text-gray-400 mb-1">DETECTED STYLE</div>
                 <div className="text-xl font-bold text-purple-400">Urban Minimalist</div>
               </motion.div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">The "Brain" Behind the Look</h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              We don't just use random number generators. Our engine is trained on 10 million+ fashion editorials, street style photos, and color theory academic papers.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              When you upload a photo, Gemini Vision API breaks it down into vectors representing shape, texture, and light, then matches those vectors against our massive wardrobe database.
            </p>
            <button className="text-cyan-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Read the Technical Whitepaper <span className="text-xl">→</span>
            </button>
          </motion.div>
        </div>

        {/* Security / Privacy Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-white/10 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/20 rounded-full blur-[100px]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Privacy by Design</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your photos are yours. Images uploaded for analysis are processed in ephemeral memory and are never stored on our servers without your explicit permission for the community showcase.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> End-to-end encryption for all transfers
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Auto-deletion after session ends
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> GDPR & CCPA Compliant
                </li>
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              {/* Abstract shield visualization */}
               <div className="relative w-64 h-64 border border-white/10 rounded-full flex items-center justify-center animate-pulse">
                  <div className="absolute inset-0 border border-purple-500/30 rounded-full scale-110" />
                  <div className="absolute inset-0 border border-cyan-500/30 rounded-full scale-125" />
                  <Shield className="w-32 h-32 text-gray-700" />
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturesPage;
