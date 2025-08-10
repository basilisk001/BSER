import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CodeDemo } from './pages/CodeDemo';
import { Documentation } from './pages/Documentation';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route path="/" element={
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            } />
            <Route path="/demo" element={
              <ErrorBoundary>
                <CodeDemo />
              </ErrorBoundary>
            } />
            <Route path="/docs" element={
              <ErrorBoundary>
                <Documentation />
              </ErrorBoundary>
            } />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;