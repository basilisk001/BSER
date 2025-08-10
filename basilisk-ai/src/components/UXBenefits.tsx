import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    emoji: '🚀',
    title: 'Instant reality check',
    description: 'Wireframes lie. In Basilisk, your idea is a real app the same day you sketch it. No "handoff" — just a URL.',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    emoji: '🤝',
    title: 'Design jam sessions',
    description: 'Everyone\'s in the file, watching the product evolve live — colors, layouts, logic — as you talk. You\'re all building together.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    emoji: '🔁',
    title: 'User testing without lag',
    description: 'Testers use a real interface, not a clickable illusion. You see exactly how it behaves under real human chaos — and can ship fixes before they leave the room.',
    color: 'from-green-400 to-cyan-500'
  },
  {
    emoji: '🛠️',
    title: 'The dev environment disappears',
    description: 'No Git merges, Node versions, or server setup. You shape products like you shape layouts in Figma or Miro.',
    color: 'from-orange-400 to-red-500'
  },
  {
    emoji: '⚡',
    title: 'Practical AI',
    description: '"Make the nav sticky and animate the dropdown" — done, live. Not a snippet, not a suggestion — a real change in the running app.',
    color: 'from-violet-400 to-purple-600'
  }
];

export const UXBenefits: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Basilisk is the closest thing to
            </span>
            <br />
            <span className="text-white">Figma for live apps.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            You're not mocking experiences — you're delivering them. The gap between concept and code disappears.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 h-full relative overflow-hidden">
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {benefit.emoji}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                
                {/* Subtle gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none blur-sm`}></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Bottom line:
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              Basilisk turns UX work from blueprints into buildings. Your team feels the real thing early enough to fix what matters — before it's baked into release.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};