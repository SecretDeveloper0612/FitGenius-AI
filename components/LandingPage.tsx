import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Upload, Zap, Layers, Camera, ScanLine, Shirt, Star, User } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const phrases = [
  "Every Single Day",
  "For The Office",
  "For The Weekend",
  "For Your Date",
  "In Every Style"
];

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col pt-20 overflow-hidden cursor-none">
      
      {/* Background Ambience (Animated) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-700/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-700/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 50, -50, 0], 
            y: [0, 50, -50, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-pink-700/10 rounded-full blur-[100px]" 
        />
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 mt-10 md:mt-20 mb-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 text-purple-300 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <SparkleIcon />
            <span>AI-Powered Personal Stylist V2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] min-h-[1.1em] md:min-h-[2.2em]">
            Look Great <br/>
            <TypewriterText phrases={phrases} />
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Upload your photo and let our advanced Gemini AI analyze your body type, complexion, and style to curate the perfect outfits for any occasion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(122,58,255,0.4)] hover:shadow-[0_0_50px_rgba(122,58,255,0.6)] transition-shadow flex items-center gap-3 cursor-none"
            >
              <Camera className="w-5 h-5" />
              Start Styling Now
            </motion.button>
            
            <button className="px-8 py-4 rounded-full glass-panel hover:bg-white/10 transition-all font-medium flex items-center gap-2 group cursor-none">
              View Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Floating Elements (Decorative) */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[5%] hidden lg:block opacity-60"
        >
          <div className="w-24 h-24 rounded-2xl glass-panel flex items-center justify-center text-5xl shadow-2xl border border-white/10 rotate-12">
            🧥
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[5%] hidden lg:block opacity-60"
        >
          <div className="w-20 h-20 rounded-2xl glass-panel flex items-center justify-center text-4xl shadow-2xl border border-white/10 -rotate-12">
            👟
          </div>
        </motion.div>
      </main>

      {/* Infinite Marquee */}
      <section className="w-full py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden mb-24">
        <div className="flex whitespace-nowrap overflow-hidden w-full mask-gradient">
          <motion.div 
            className="flex gap-16 items-center text-6xl md:text-8xl font-black text-transparent stroke-text uppercase opacity-30"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
             <span>Streetwear</span>
             <span className="text-purple-500/50">Formal</span>
             <span>Vintage</span>
             <span className="text-cyan-500/50">Cyberpunk</span>
             <span>Casual</span>
             <span>Minimalist</span>
             <span>Streetwear</span>
             <span className="text-purple-500/50">Formal</span>
             <span>Vintage</span>
             <span className="text-cyan-500/50">Cyberpunk</span>
             <span>Casual</span>
             <span>Minimalist</span>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose FitGenius?</h2>
          <p className="text-gray-400">Advanced AI perception meets high-end fashion styling.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Upload className="w-8 h-8 text-purple-400" />}
            title="Smart Analysis"
            desc="Our vision model detects your exact body shape, skin undertones, and hair color in seconds."
            delay={0}
          />
          <FeatureCard 
            icon={<Layers className="w-8 h-8 text-cyan-400" />}
            title="Outfit Matching"
            desc="Get scientifically coordinated color palettes and clothing items that match your vibe."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-pink-400" />}
            title="Instant Visualization"
            desc="Don't just imagine it. See yourself wearing the outfit with our generative AI preview."
            delay={0.4}
          />
        </div>
      </section>

      {/* How It Works (Timeline) */}
      <section className="w-full bg-gradient-to-b from-transparent to-purple-900/10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
           <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          </motion.div>

          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
            {/* Connecting Line */}
            <div className="absolute top-[60px] left-[50%] md:left-[10%] right-[50%] md:right-[10%] h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 hidden md:block" />
            
            <StepCard 
              num="01" 
              title="Upload Photo" 
              desc="Take a full body selfie or upload one from your gallery."
              icon={<Camera className="w-6 h-6 text-white" />}
              color="bg-purple-600"
            />
             <StepCard 
              num="02" 
              title="AI Processing" 
              desc="Our engine identifies your morphology and seasonal color palette."
              icon={<ScanLine className="w-6 h-6 text-white" />}
              color="bg-cyan-600"
            />
             <StepCard 
              num="03" 
              title="Get Styled" 
              desc="Receive curated looks and shop the items directly."
              icon={<Shirt className="w-6 h-6 text-white" />}
              color="bg-pink-600"
            />
          </div>
        </div>
      </section>

      {/* Community Showcase / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-24 mb-20">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Styled by AI</h2>
            <p className="text-gray-400">Join thousands of users upgrading their wardrobe.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard 
              quote="I never knew I was an inverted triangle body type. The suggestions for office wear changed my confidence completely."
              author="Sarah J."
              role="Marketing Executive"
              delay={0}
            />
            <TestimonialCard 
              quote="The color matching is insane. It found the exact shade of teal that makes my skin pop. Highly recommended!"
              author="Marcus T."
              role="Software Engineer"
              delay={0.2}
            />
            <TestimonialCard 
              quote="Used this for my cousin's wedding. The 'Wedding Ethnic' mode gave me the perfect Sherwani idea."
              author="Aravind P."
              role="Architect"
              delay={0.4}
            />
          </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 px-4 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto glass-panel p-12 rounded-[3rem] border border-white/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 blur-3xl -z-10" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to reinvent your look?</h2>
          <button 
             onClick={onStart}
             className="px-10 py-5 rounded-full bg-white text-black font-bold text-xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto cursor-none"
          >
            <Zap className="w-6 h-6 fill-black" />
            Get Started Free
          </button>
        </motion.div>
      </section>

    </div>
  );
};

// --- Subcomponents ---

const TypewriterText = ({ phrases }: { phrases: string[] }) => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <div className="h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="gradient-text block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -10 }}
    className="p-8 rounded-3xl glass-panel border border-white/5 hover:border-purple-500/30 transition-all cursor-none group"
  >
    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </motion.div>
);

const StepCard = ({ num, title, desc, icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center relative z-10 max-w-xs"
  >
    <div className={`w-20 h-20 rounded-full ${color} shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center mb-6 border-4 border-[#050505]`}>
      {icon}
    </div>
    <div className="text-6xl font-bold text-white/5 absolute -top-10 -z-10 select-none">{num}</div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
  >
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
    </div>
    <p className="text-lg text-gray-300 italic mb-6">"{quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
        <User className="w-5 h-5 text-gray-400" />
      </div>
      <div>
        <div className="font-bold">{author}</div>
        <div className="text-xs text-gray-500">{role}</div>
      </div>
    </div>
  </motion.div>
);

const SparkleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 0L9.168 5.832L15 7.5L9.168 9.168L7.5 15L5.832 9.168L0 7.5L5.832 5.832L7.5 0Z" fill="currentColor"/>
  </svg>
);

export default LandingPage;