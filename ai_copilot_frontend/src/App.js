import React from 'react';
import ChatInterface from './components/ChatInterface';
import './App.css';

/**
 * Main App component for AI Copilot Chat.
 * Serves as the entry point and renders the ChatInterface.
 */

// PUBLIC_INTERFACE
/**
 * Root application component.
 * @returns {JSX.Element} The application root with ChatInterface
 */
function App() {
  return (
    <div className="App">
      <ChatInterface />
    </div>
  );
}

export default App;
