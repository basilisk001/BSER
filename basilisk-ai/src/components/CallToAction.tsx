import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/images/dark_futuristic_ai_coding_background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60"></div>
      </div>
      
      {/* Animated Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-300 rounded-full"
          animate={{ 
            x: [0, 30, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Ready to build
            </span>
            <br />
            <span className="text-white">the future?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience AI-powered development that feels like magic. 
            Start building interactive apps with just your ideas.
          </p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/demo">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-bold text-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              >
                Try Interactive Demo →
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-cyan-500 text-cyan-400 rounded-2xl font-bold text-xl hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Join Beta Waitlist
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">10x</div>
              <div className="text-gray-300">Faster Development</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">Zero</div>
              <div className="text-gray-300">Context Switching</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
              <div className="text-gray-300">Code Ownership</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-24 pt-12 border-t border-gray-800 text-center"
      >
        <div className="container mx-auto px-4">
          <p className="text-gray-500 mb-4">
            © 2025 BasiliskAI. Minimal. Open source. Revolutionary.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Community</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
          </div>
        </div>
      </motion.footer>
    </section>
  );
};