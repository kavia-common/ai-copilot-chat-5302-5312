import React from 'react';
import ChatWindow from './components/ChatWindow';

/**
 * PUBLIC_INTERFACE
 * Main App component that provides the layout structure for the AI Copilot interface.
 * Includes a header with branding, the main chat window, and a footer.
 */
export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand-mark">AI Copilot</div>
        <div className="brand-sub">Elegant assistance for writing, summarizing, brainstorming, and coding</div>
      </header>
      <main className="app-main">
        <ChatWindow />
      </main>
      <footer className="app-footer">Made with ✨ Champagne elegance</footer>
    </div>
  );
}
