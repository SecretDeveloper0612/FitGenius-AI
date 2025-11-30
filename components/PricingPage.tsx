
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, HelpCircle, Briefcase } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "Perfect for trying out the AI stylist.",
    features: [
      "3 Outfit generations per day",
      "Basic body shape analysis",
      "Standard quality previews",
      "Community showcase access"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Fashionista",
    price: "$9.99",
    period: "/month",
    desc: "For the daily style enthusiast.",
    features: [
      "Unlimited generations",
      "Advanced Color Season Analysis",
      "4K Ultra-HD Previews",
      "Wardrobe Import (Beta)",
      "Priority Support"
    ],
    cta: "Go Pro",
    popular: true
  },
  {
    name: "Influencer",
    price: "$24.99",
    period: "/month",
    desc: "Professional tools for content creators.",
    features: [
      "Everything in Fashionista",
      "Commercial Usage Rights",
      "Multiple User Profiles",
      "Video Generation (Coming Soon)",
      "API Access"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const faqs = [
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel your subscription at any time from your account settings. You will retain access until the end of your billing period."
  },
  {
    q: "How accurate is the body shape analysis?",
    a: "Our computer vision model is trained on over 2 million diverse body types and achieves a 98% accuracy rating compared to professional tailor measurements."
  },
  {
    q: "Do I own the generated images?",
    a: "On the Starter plan, images are for personal use. The Influencer plan grants full commercial usage rights for social media and marketing."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay."
  }
];

const PricingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full min-h-screen pt-24 px-4">
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Invest in Your <span className="gradient-text">Image</span></h1>
          <p className="text-xl text-gray-400">Choose the plan that fits your style journey.</p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`
                relative p-8 rounded-3xl border transition-all duration-300 flex flex-col
                ${plan.popular 
                  ? 'bg-white/[0.05] border-purple-500 shadow-[0_0_30px_rgba(122,58,255,0.2)]' 
                  : 'glass-panel border-white/5 hover:border-white/20'}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-300 mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 mb-1">{plan.period}</span>}
                </div>
                <p className="text-sm text-gray-500">{plan.desc}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`
                w-full py-4 rounded-xl font-bold transition-all
                ${plan.popular 
                  ? 'bg-white text-black hover:scale-105' 
                  : 'bg-white/10 hover:bg-white/20 text-white'}
              `}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise / Business Section */}
        <div className="rounded-3xl bg-gradient-to-r from-gray-900 to-black border border-white/10 p-12 mb-32 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-bold mb-4">
              <Briefcase className="w-5 h-5" />
              <span>FOR RETAILERS</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Integrate FitGenius into your Store</h2>
            <p className="text-gray-400 leading-relaxed">
              Decrease return rates and boost conversion by letting your customers visualize your inventory on their own bodies. Our API integrates seamlessly with Shopify, Magento, and custom stacks.
            </p>
          </div>
          <button className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 font-bold whitespace-nowrap transition-colors">
            Contact Enterprise Sales
          </button>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-400" /> Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-5 h-5 text-purple-400" /> : <Plus className="w-5 h-5 text-gray-500" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;
