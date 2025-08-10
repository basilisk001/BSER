import React from 'react';
import { motion } from 'framer-motion';

interface DemoControlsProps {
  onDemoSelect?: (demo: string) => void;
}

const demos = [
  {
    id: 'dark-mode',
    title: 'Add Dark Mode',
    description: 'Watch AI add a complete dark mode toggle across multiple files',
    icon: '🌙',
    command: 'Add dark mode toggle to the app'
  },
  {
    id: 'sidebar',
    title: 'Create Sidebar',
    description: 'AI generates a responsive sidebar with navigation',
    icon: '📱',
    command: 'Add a collapsible sidebar with navigation menu'
  },
  {
    id: 'auth',
    title: 'User Authentication',
    description: 'Implement login/logout functionality with state management',
    icon: '🔐',
    command: 'Add user authentication with login and logout'
  },
  {
    id: 'search',
    title: 'Search Feature',
    description: 'Add search functionality with filtering and highlighting',
    icon: '🔍',
    command: 'Add search functionality to filter todos'
  }
];

export const DemoControls: React.FC<DemoControlsProps> = ({ onDemoSelect }) => {
  return (
    <div className="mb-8">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold mb-2 text-white">
          Quick Demo Commands
        </h2>
        <p className="text-gray-400">
          Click any demo below or press <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">Cmd+K</kbd> in the editor to try your own commands
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demos.map((demo, index) => (
          <motion.button
            key={demo.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onDemoSelect?.(demo.command)}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-left hover:border-cyan-500/50 transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {demo.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {demo.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {demo.description}
            </p>
            <div className="mt-4 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to execute →
            </div>
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700"
      >
        <div className="flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Pro Tips</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Use natural language: "Make the header sticky and add a search bar"</li>
              <li>• Be specific: "Add a red delete button to each todo item"</li>
              <li>• Multi-file changes: "Create a new component for user profiles"</li>
              <li>• Styling requests: "Make this look more modern with gradients"</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};