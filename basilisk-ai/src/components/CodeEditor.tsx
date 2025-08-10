import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileTab {
  name: string;
  content: string;
  language: string;
}

const initialFiles: FileTab[] = [
  {
    name: 'App.tsx',
    language: 'typescript',
    content: `import React, { useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light');

  return (
    <div className={\`app \${theme}\`}>
      <Header theme={theme} />
      <TodoList todos={todos} />
      <Footer />
    </div>
  );
}

export default App;`
  },
  {
    name: 'Header.tsx',
    language: 'typescript', 
    content: `import React from 'react';

interface HeaderProps {
  theme: string;
}

export const Header: React.FC<HeaderProps> = ({ theme }) => {
  return (
    <header className="header">
      <h1>Todo App</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
    </header>
  );
};`
  },
  {
    name: 'styles.css',
    language: 'css',
    content: `.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  min-height: 100vh;
  background: #ffffff;
  color: #333333;
}

.header {
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}`
  }
];

interface CodeEditorProps {
  demoCommand?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ demoCommand }) => {
  const [files, setFiles] = useState<FileTab[]>(initialFiles);
  const [activeFile, setActiveFile] = useState(0);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiCommand, setAiCommand] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    try {
      editorRef.current = editor;
      setEditorLoaded(true);
      setEditorError(null);
      
      // Add Cmd+K keybinding safely
      if (monaco && monaco.KeyMod && monaco.KeyCode) {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
          setShowCommandPalette(true);
        });
      }
    } catch (error) {
      console.log('Could not add keybinding:', error);
    }
    
    // Fallback: Add global keydown listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Store cleanup function
    cleanupRef.current = () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  };
  
  const handleEditorLoadError = (error: any) => {
    console.error('Monaco Editor failed to load:', error);
    setEditorError('Failed to load code editor');
    setEditorLoaded(false);
  };
  
  // Cleanup effect
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
  
  // Handle external demo commands
  const handleExternalCommand = (command: string) => {
    setAiCommand(command);
    setShowCommandPalette(true);
    // Auto-execute after a short delay for demo effect
    setTimeout(() => {
      if (command.trim()) {
        executeAICommand(command);
      }
    }, 1000);
  };
  
  // Effect to handle external demo commands
  useEffect(() => {
    if (demoCommand && demoCommand.trim()) {
      handleExternalCommand(demoCommand);
    }
  }, [demoCommand]);

  const executeAICommand = async (command: string) => {
    setIsAIProcessing(true);
    setShowCommandPalette(false);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Handle different AI commands
    if (command.toLowerCase().includes('dark mode') || command.toLowerCase().includes('dark theme')) {
      // Simulate adding dark mode
      const updatedFiles = files.map((file) => {
        if (file.name === 'App.tsx') {
          return {
            ...file,
            content: file.content.replace(
              'const [theme, setTheme] = useState(\'light\');',
              `const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };`
            ).replace(
              '<Header theme={theme} />',
              '<Header theme={theme} toggleTheme={toggleTheme} />'
            )
          };
        }
        if (file.name === 'Header.tsx') {
          return {
            ...file,
            content: `import React from 'react';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="header">
      <h1>Todo App</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li>
            <button 
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};`
          };
        }
        if (file.name === 'styles.css') {
          return {
            ...file,
            content: file.content + `\n\n/* Dark theme styles */
.app.dark {
  background: #1a1a1a;
  color: #ffffff;
}

.app.dark .header {
  border-bottom-color: #333;
  background: #2d2d2d;
}

.theme-toggle {
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.app.dark .theme-toggle {
  border-color: #666;
  color: #fff;
}`
          };
        }
        return file;
      });
      setFiles(updatedFiles);
    }
    
    else if (command.toLowerCase().includes('sidebar')) {
      // Simulate adding sidebar
      const updatedFiles = files.map((file) => {
        if (file.name === 'App.tsx') {
          return {
            ...file,
            content: file.content.replace(
              'const [theme, setTheme] = useState(\'light\');',
              `const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);`
            ).replace(
              '<div className={\`app \${theme}\`}>',
              `<div className={\`app \${theme}\`}>
      {sidebarOpen && (
        <div className="sidebar">
          <button onClick={() => setSidebarOpen(false)}>×</button>
          <nav>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Settings</a></li>
            </ul>
          </nav>
        </div>
      )}`
            ).replace(
              '<Header theme={theme}',
              '<Header theme={theme} onMenuClick={() => setSidebarOpen(true)}'
            )
          };
        }
        if (file.name === 'styles.css') {
          return {
            ...file,
            content: file.content + `\n\n/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: #f8f9fa;
  border-right: 1px solid #eee;
  padding: 1rem;
  z-index: 1000;
}

.sidebar button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.sidebar nav {
  margin-top: 3rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 0.5rem;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  display: block;
  border-radius: 4px;
}

.sidebar a:hover {
  background: #e9ecef;
}`
          };
        }
        return file;
      });
      setFiles(updatedFiles);
    }
    
    else if (command.toLowerCase().includes('search')) {
      // Simulate adding search functionality
      const updatedFiles = files.map((file) => {
        if (file.name === 'App.tsx') {
          return {
            ...file,
            content: file.content.replace(
              'const [theme, setTheme] = useState(\'light\');',
              `const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);`
            ).replace(
              '<TodoList todos={todos} />',
              `<div className="search-container">
        <input 
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <TodoList todos={filteredTodos} />`
            )
          };
        }
        if (file.name === 'styles.css') {
          return {
            ...file,
            content: file.content + `\n\n/* Search styles */
.search-container {
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}`
          };
        }
        return file;
      });
      setFiles(updatedFiles);
    }
    
    else if (command.toLowerCase().includes('auth')) {
      // Simulate adding authentication
      const updatedFiles = files.map((file) => {
        if (file.name === 'App.tsx') {
          return {
            ...file,
            content: file.content.replace(
              'const [theme, setTheme] = useState(\'light\');',
              `const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  
  const handleLogin = (username) => {
    setUser({ name: username });
    setShowLogin(false);
  };
  
  const handleLogout = () => {
    setUser(null);
  };`
            ).replace(
              '<Header theme={theme}',
              '<Header theme={theme} user={user} onLogin={() => setShowLogin(true)} onLogout={handleLogout}'
            ).replace(
              '</div>',
              `{showLogin && (
        <div className="modal">
          <div className="modal-content">
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={() => handleLogin('Demo User')}>Login</button>
            <button onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>`
            )
          };
        }
        if (file.name === 'styles.css') {
          return {
            ...file,
            content: file.content + `\n\n/* Auth Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.modal-content h2 {
  margin-bottom: 1rem;
}

.modal-content input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-content button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:first-of-type {
  background: #007bff;
  color: white;
}

.modal-content button:last-of-type {
  background: #6c757d;
  color: white;
}`
          };
        }
        return file;
      });
      setFiles(updatedFiles);
    }
    
    setIsAIProcessing(false);
    setAiCommand('');
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
      {/* File Tabs */}
      <div className="flex bg-gray-900 border-b border-gray-700">
        {files.map((file, index) => (
          <button
            key={index}
            onClick={() => setActiveFile(index)}
            className={`px-4 py-3 text-sm border-r border-gray-700 transition-all ${
              activeFile === index 
                ? 'bg-gray-800 text-cyan-400 border-b-2 border-cyan-400' 
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {file.name}
          </button>
        ))}
        <div className="flex-1 bg-gray-900"></div>
      </div>
      
      {/* Editor */}
      <div className="relative">
        {editorError ? (
          // Fallback Editor
          <div className="h-[500px] bg-gray-800 p-4">
            <div className="text-center text-yellow-400 mb-4">
              ⚠️ Monaco Editor failed to load. Using fallback editor.
            </div>
            <textarea
              className="w-full h-full bg-gray-900 text-white p-4 font-mono text-sm border border-gray-600 rounded resize-none focus:border-cyan-400 focus:outline-none"
              value={files[activeFile].content}
              onChange={(e) => {
                const updatedFiles = [...files];
                updatedFiles[activeFile].content = e.target.value;
                setFiles(updatedFiles);
              }}
              placeholder="Code editor content..."
            />
          </div>
        ) : (
          <Editor
            height="500px"
            language={files[activeFile].language}
            value={files[activeFile].content}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            loading={
              <div className="h-[500px] bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-cyan-400">Loading code editor...</p>
                </div>
              </div>
            }
            onChange={(value) => {
              const updatedFiles = [...files];
              updatedFiles[activeFile].content = value || '';
              setFiles(updatedFiles);
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on'
            }}
          />
        )}
        
        {/* AI Processing Overlay */}
        <AnimatePresence>
          {isAIProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-3 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-cyan-400 font-semibold">AI is processing your request...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Command Palette */}
      <AnimatePresence>
        {showCommandPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowCommandPalette(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 border border-gray-600"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🤖</div>
                <h3 className="text-xl font-bold text-white">AI Assistant</h3>
              </div>
              
              <input
                type="text"
                value={aiCommand}
                onChange={(e) => setAiCommand(e.target.value)}
                placeholder="Describe what you want to build or change..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && aiCommand.trim()) {
                    executeAICommand(aiCommand);
                  }
                  if (e.key === 'Escape') {
                    setShowCommandPalette(false);
                  }
                }}
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => aiCommand.trim() && executeAICommand(aiCommand)}
                  disabled={!aiCommand.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Execute
                </button>
                <button
                  onClick={() => setShowCommandPalette(false)}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
              </div>
              
              <div className="mt-4 text-sm text-gray-400">
                <p><kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Cmd+K</kbd> to open this palette</p>
                <p className="mt-1">Try: "Add dark mode toggle", "Create a sidebar", "Add user authentication"</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Status Bar */}
      <div className="bg-gray-900 px-4 py-2 text-sm text-gray-400 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <span>Line 1, Col 1</span>
            <span>{files[activeFile].language}</span>
          </div>
          <div className="flex gap-4">
            <span>Press <kbd className="px-1 bg-gray-700 rounded">Cmd+K</kbd> for AI assistance</span>
          </div>
        </div>
      </div>
    </div>
  );
};