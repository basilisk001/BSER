import React, { useState } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { Navigation } from '../components/Navigation';
import { DemoControls } from '../components/DemoControls';

export const CodeDemo: React.FC = () => {
  const [demoCommand, setDemoCommand] = useState<string>('');
  
  const handleDemoSelect = (command: string) => {
    // Reset first to ensure useEffect triggers
    setDemoCommand('');
    setTimeout(() => {
      setDemoCommand(command);
    }, 100);
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              BasiliskAI Interactive Demo
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience how AI integrates seamlessly into your coding workflow. Try the Cmd+K functionality and see real-time AI edits.
            </p>
          </div>
          <DemoControls onDemoSelect={handleDemoSelect} />
          <div className="mt-8">
            <CodeEditor demoCommand={demoCommand} />
          </div>
        </div>
      </div>
    </div>
  );
};