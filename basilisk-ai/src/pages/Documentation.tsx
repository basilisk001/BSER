import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Link } from 'react-router-dom';

export const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              BasiliskAI Documentation
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Getting Started</h2>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-300 mb-4">
                    BasiliskAI is an AI-powered IDE companion that makes coding faster, smarter, and more intuitive. 
                    This documentation will help you understand and leverage its full potential.
                  </p>
                  <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-4 mb-4">
                    <p className="text-cyan-300">
                      💡 <strong>Quick Start:</strong> Press <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">Cmd+K</kbd> anywhere in the editor to open the AI command palette.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Core Features</h2>
                <div className="grid gap-6">
                  
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-cyan-400 mb-3">🧠 AI Knows Your Codebase</h3>
                    <p className="text-gray-300 mb-3">
                      BasiliskAI indexes your entire repository, understanding folder structure, imports, 
                      dependencies, and coding patterns. When you request changes, it maintains consistency 
                      across all files.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <code className="text-cyan-300">"Add a dark mode toggle"</code>
                      <p className="text-gray-400 text-sm mt-1">
                        → Updates theme state, header component, and CSS styles automatically
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-purple-400 mb-3">⚡ Real Teammate Editing</h3>
                    <p className="text-gray-300 mb-3">
                      Select code, hit Cmd+K, describe what you want. BasiliskAI rewrites inline, 
                      preserving your formatting, comments, and style. Every change is a reviewable diff.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <code className="text-purple-300">"Make this component responsive"</code>
                      <p className="text-gray-400 text-sm mt-1">
                        → Adds responsive classes while keeping existing styling
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-green-400 mb-3">🚀 Works at Scale</h3>
                    <p className="text-gray-300 mb-3">
                      Multi-file reasoning means complex refactors across 15+ files become single AI commands. 
                      Imports, types, and naming stay consistent everywhere.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <code className="text-green-300">"Refactor to use TypeScript interfaces"</code>
                      <p className="text-gray-400 text-sm mt-1">
                        → Updates all components, props, and type definitions
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Command Examples</h2>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">Natural Language Commands</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400 font-mono text-sm mt-1">UI/UX:</span>
                      <div>
                        <p className="text-gray-300">"Add a sticky navigation bar with smooth scroll"</p>
                        <p className="text-gray-300">"Create a modal for user settings with form validation"</p>
                        <p className="text-gray-300">"Make the sidebar collapsible with animation"</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-400 font-mono text-sm mt-1">Logic:</span>
                      <div>
                        <p className="text-gray-300">"Add user authentication with login/logout"</p>
                        <p className="text-gray-300">"Implement search functionality with debounced input"</p>
                        <p className="text-gray-300">"Add error boundaries for better error handling"</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 font-mono text-sm mt-1">Style:</span>
                      <div>
                        <p className="text-gray-300">"Convert to dark theme with neon accents"</p>
                        <p className="text-gray-300">"Add hover effects and smooth transitions"</p>
                        <p className="text-gray-300">"Make it mobile-responsive with breakpoints"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Keyboard Shortcuts</h2>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Open AI Command Palette</span>
                      <kbd className="px-3 py-1 bg-gray-700 rounded text-cyan-400">Cmd + K</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Execute Command</span>
                      <kbd className="px-3 py-1 bg-gray-700 rounded text-cyan-400">Enter</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Cancel Command</span>
                      <kbd className="px-3 py-1 bg-gray-700 rounded text-cyan-400">Escape</kbd>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Best Practices</h2>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-cyan-400 mb-2">Be Specific</h4>
                      <p className="text-gray-300">
                        Instead of "make it better", try "add loading states with spinner animations"
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-2">Context Matters</h4>
                      <p className="text-gray-300">
                        BasiliskAI understands your project structure. Reference components, files, or features by name.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-2">Review Changes</h4>
                      <p className="text-gray-300">
                        Every AI modification is shown as a diff. Review before accepting to maintain code quality.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Integration</h2>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-300 mb-4">
                    BasiliskAI integrates seamlessly with your existing development workflow:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Works with any IDE that supports extensions</li>
                    <li>Maintains full Git history for all changes</li>
                    <li>Preserves your coding style and conventions</li>
                    <li>Supports all major programming languages and frameworks</li>
                    <li>No disruption to your current tools and processes</li>
                  </ul>
                </div>
              </section>
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mt-12"
            >
              <Link to="/demo">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                >
                  Try Interactive Demo →
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};