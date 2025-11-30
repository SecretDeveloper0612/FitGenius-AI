
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Globe, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 font-medium mb-6"
          >
            Our Mission
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Democratizing <span className="gradient-text">Personal Style</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe looking good shouldn't be a luxury reserved for those who can afford personal stylists. 
            By combining state-of-the-art AI with fashion theory, we're putting a world-class style consultant in everyone's pocket.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-white/10 py-12">
          {[
            { label: "Outfits Generated", value: "2M+" },
            { label: "Active Users", value: "150k" },
            { label: "Countries", value: "85" },
            { label: "Fashion Brands", value: "500+" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">The Origin Story</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                FitGenius AI started in a small coffee shop in San Francisco in 2023. Our founders, a computer vision engineer and a fashion editor, realized a disconnect: people have closets full of clothes but "nothing to wear".
              </p>
              <p>
                The problem wasn't lack of options, it was a lack of curation. Traditional algorithms pushed trends, not what actually looked good on the individual.
              </p>
              <p>
                We spent 18 months building our proprietary "Morphology Engine" – an AI that understands the geometry of the human body and the physics of fabric drape.
              </p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
             <motion.img 
               src="https://images.unsplash.com/photo-1542295669297-4d352b042bca?q=80&w=800&auto=format&fit=crop" 
               alt="Team working"
               className="rounded-3xl w-full h-64 object-cover mt-12"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
             />
             <motion.img 
               src="https://images.unsplash.com/photo-1604176354204-9268737828fa?q=80&w=800&auto=format&fit=crop" 
               alt="Design sketch"
               className="rounded-3xl w-full h-64 object-cover"
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
             />
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold mb-12 text-center">The Visionaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Elena R.", role: "CEO & Co-Founder", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" },
              { name: "David C.", role: "CTO & AI Lead", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" },
              { name: "Sophia L.", role: "Head of Style", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" }
            ].map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                  <p className="text-cyan-400">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/5 p-12 text-center">
           <h2 className="text-3xl font-bold mb-8">Built With Future Tech</h2>
           <div className="flex flex-wrap justify-center gap-12 text-gray-500">
             <div className="flex flex-col items-center gap-2">
               <Globe className="w-8 h-8 text-purple-400" />
               <span className="font-mono text-sm">Gemini 1.5 Pro</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <Code className="w-8 h-8 text-cyan-400" />
               <span className="font-mono text-sm">React 19</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <Zap className="w-8 h-8 text-yellow-400" />
               <span className="font-mono text-sm">Vite</span>
             </div>
              <div className="flex flex-col items-center gap-2">
               <Users className="w-8 h-8 text-pink-400" />
               <span className="font-mono text-sm">Firebase</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
