import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { sendChatMessage } from '../api/client';
import './ChatWindow.css';

/**
 * PUBLIC_INTERFACE
 * Main chat window component.
 * 
 * Manages chat session state, message history, and communication with the backend API.
 * Provides the main chat interface with message display and input areas.
 */
function ChatWindow() {
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Handle sending a new message.
   * 
   * @param {string} content - The message content to send
   */
  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: content.trim()
    };

    // Add user message to state
    setMessages(prev => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);

    try {
      // Send to backend
      const response = await sendChatMessage(sessionId, [...messages, userMessage]);

      // Add assistant response
      setMessages(prev => [...prev, response.message]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message. Please try again.');
      
      // Show error as a system message
      const errorMessage = {
        id: uuidv4(),
        role: 'system',
        content: `Error: ${err.message || 'Failed to get response. Please try again.'}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h1 className="chat-title">AI Copilot</h1>
        <p className="chat-subtitle">Powered by Gemini</p>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h2>Welcome to AI Copilot!</h2>
            <p>I can help you with:</p>
            <ul>
              <li>Writing and editing content</li>
              <li>Summarizing information</li>
              <li>Brainstorming ideas</li>
              <li>Coding assistance</li>
              <li>Answering questions</li>
            </ul>
            <p>Start a conversation below!</p>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}
        
        {isLoading && (
          <div className="loading-indicator">
            <div className="typing-animation">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{error}</span>
          <button 
            className="error-dismiss"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
      />
    </div>
  );
}

export default ChatWindow;
