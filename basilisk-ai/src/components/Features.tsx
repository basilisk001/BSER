import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    number: '01',
    title: 'The AI knows your codebase',
    description: 'Basilisk indexes your entire repo — folder structure, imports, dependencies, quirks and all. Say "Add a dark mode toggle" and it updates every relevant file, keeping the system in sync.',
    icon: '🧠',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    number: '02',
    title: 'Edits like a real teammate',
    description: 'Select code, hit Cmd+K, say what you want. Basilisk rewrites inline, preserving formatting, comments, and style. You review the diff, approve, done. No copy-paste. No formatting purgatory.',
    icon: '⚡',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    number: '03',
    title: 'Works at scale',
    description: 'Multi-file reasoning means a one-hour refactor across 15 files becomes one AI command. Imports, types, and naming stay consistent everywhere.',
    icon: '🚀',
    gradient: 'from-green-400 to-cyan-500'
  },
  {
    number: '04',
    title: 'Flow stays unbroken',
    description: 'Basilisk lives inside your IDE and your command palette. It\'s as native as "Find and Replace" or "Git Commit." No browser tabs, no context switching.',
    icon: '🌊',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    number: '05',
    title: 'You ship faster, with full control',
    description: 'Every change is a diff you can inspect. Full Git history. Easy reverts. AI speed, human judgment.',
    icon: '⚙️',
    gradient: 'from-violet-400 to-purple-600'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Core Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of AI-powered development
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 h-full">
                <div className="flex items-start gap-6">
                  <div className={`text-6xl mb-4 p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 border border-opacity-20`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className={`inline-block text-sm font-mono font-bold px-3 py-1 rounded-full bg-gradient-to-r ${feature.gradient} text-black mb-4`}>
                      {feature.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover Effect Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 p-8 bg-gray-800/30 rounded-2xl border border-gray-700 max-w-4xl mx-auto"
        >
          <p className="text-xl text-cyan-400 font-semibold mb-4">
            "If VS Code is a workshop, Basilisk is the expert apprentice who's read your whole codebase, knows your tech stack, and works at the speed of thought."
          </p>
        </motion.div>
      </div>
    </section>
  );
};