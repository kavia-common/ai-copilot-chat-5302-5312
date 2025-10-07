import React from 'react';
import ChatWindow from './components/ChatWindow';
import './styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * Main application component for AI Copilot.
 * 
 * Renders the chat interface with the Champagne theme applied.
 * Handles the overall layout and structure of the application.
 */
function App() {
  return (
    <div className="app-container">
      <ChatWindow />
    </div>
  );
}

export default App;
