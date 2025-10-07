/**
 * Main App Component
 * Entry point for the AI Copilot Chat application
 */

import React from 'react';
import ChatInterface from './components/ChatInterface';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main application component that renders the chat interface
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <div className="App">
      <ChatInterface />
    </div>
  );
}

export default App;
