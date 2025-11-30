
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';

const articles = [
  {
    title: "Why 'Color Season' Analysis is Trending on TikTok",
    excerpt: "The 80s concept is back. Here is why Gen Z is obsessed with finding out if they are a 'Deep Autumn' or a 'Cool Summer'.",
    image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=800&auto=format&fit=crop",
    date: "Mar 15, 2024",
    author: "Sophia L.",
    category: "Trends"
  },
  {
    title: "How AI is Reducing Fast Fashion Waste",
    excerpt: "By helping consumers buy items they actually wear, predictive styling AI could reduce clothing returns by up to 40%.",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop",
    date: "Mar 10, 2024",
    author: "David C.",
    category: "Sustainability"
  },
  {
    title: "5 Wardrobe Essentials for a Minimalist 2024",
    excerpt: "Forget the noise. These 5 pieces are all you need to build a versatile capsule wardrobe for any season.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    date: "Feb 28, 2024",
    author: "Elena R.",
    category: "Style Guides"
  },
  {
    title: "The Psychology of 'Power Dressing' in Remote Work",
    excerpt: "Does dressing up for a Zoom call actually improve your performance? New studies suggest yes.",
    image: "https://images.unsplash.com/photo-1598550881338-960313da4abe?q=80&w=800&auto=format&fit=crop",
    date: "Feb 15, 2024",
    author: "Sarah J.",
    category: "Work Life"
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Fashion <span className="gradient-text">Intelligence</span></h1>
          <p className="text-gray-400">Insights on style, technology, and the future of self-expression.</p>
        </div>

        {/* Featured Article */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-16 group cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" 
            alt="Featured" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
            <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full mb-4">FEATURED</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-purple-300 transition-colors">
              The Future of Digital Identity: Why Your Avatar Needs a Stylist
            </h2>
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> Elena R.</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Mar 20, 2024</span>
            </div>
          </div>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col h-full rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{article.category}</span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">{article.title}</h3>
                <p className="text-gray-400 mb-6 flex-1">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:translate-x-2 transition-transform">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-white/10 p-12 text-center mb-24">
          <h2 className="text-3xl font-bold mb-4">Subscribe to our Weekly Edit</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Get curated style tips, trend alerts, and exclusive interviews delivered to your inbox every Sunday.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-black/50 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
