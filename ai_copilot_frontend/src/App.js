import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import './styles/theme.css';
import './styles/chat.css';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { useChatApi } from './hooks/useChatApi';
import { applyThemeToDocument, THEMES } from './utils/theme';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the root component for the AI Copilot chat application.
   * It composes the header, chat window, input area, and typing indicator.
   */
  const [theme, setTheme] = useState(THEMES.champagne); // default to Champagne theme
  const [sessionId] = useState(() => {
    // Generate ephemeral session id for stateless sessions
    return `sess_${Math.random().toString(36).slice(2, 10)}`;
  });

  const {
    messages,
    loading,
    error,
    sendUserMessage,
    sendPresetPrompt,
  } = useChatApi(sessionId);

  const containerRef = useRef(null);

  // Apply theme to document root
  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  // Auto-scroll to bottom on new messages
  const lastMessageId = useMemo(() => (messages.length ? messages[messages.length - 1].id : null), [messages]);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lastMessageId, loading]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev =>
      prev.name === THEMES.champagne.name ? THEMES.dark : THEMES.champagne
    );
  };

  return (
    <div className="app-root">
      <Header onToggleTheme={toggleTheme} themeName={theme.name} />
      <main className="chat-layout">
        <div className="chat-surface" ref={containerRef} aria-live="polite" aria-label="Chat messages">
          <ChatWindow messages={messages} />
          {loading && <TypingIndicator text="AI is typing..." />}
        </div>
        <div className="input-surface" role="form" aria-label="Send a message">
          <ChatInput
            onSend={sendUserMessage}
            onPreset={(preset) => sendPresetPrompt(preset)}
            disabled={loading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
