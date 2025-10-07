/**
 * ChatInterface Component
 * Main chat interface managing messages, session, and API communication
 */

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import { sendMessage } from '../services/apiService';
import './ChatInterface.css';

/**
 * PUBLIC_INTERFACE
 * ChatInterface component - Main chat UI
 * @returns {JSX.Element} ChatInterface component
 */
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize session on mount
  useEffect(() => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    console.log('Session initialized:', newSessionId);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Scroll to the bottom of the messages container
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Handle sending a new message
   * @param {string} messageText - User's message content
   */
  const handleSendMessage = async (messageText) => {
    if (!sessionId) {
      setError('Session not initialized. Please refresh the page.');
      return;
    }

    // Add user message to UI immediately
    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Send message to backend
      const response = await sendMessage(sessionId, messageText);

      // Add assistant response to UI
      const assistantMessage = {
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message. Please try again.');
      
      // Add error message to chat
      const errorMessage = {
        role: 'assistant',
        content: `**Error:** ${err.message || 'Failed to send message. Please try again.'}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle clearing the conversation
   */
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this conversation?')) {
      setMessages([]);
      setError(null);
      // Generate new session ID
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      console.log('New session started:', newSessionId);
    }
  };

  return (
    <div className="chat-interface">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <h1 className="chat-title">🤖 AI Copilot</h1>
          <p className="chat-subtitle">Your intelligent assistant powered by Gemini</p>
        </div>
        <button
          className="clear-button"
          onClick={handleClearChat}
          aria-label="Clear conversation"
          title="Clear conversation"
        >
          🗑️ Clear
        </button>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h2>Start a conversation</h2>
            <p>Ask me anything! I can help with writing, coding, brainstorming, and more.</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={() => setError(null)} className="error-close">×</button>
        </div>
      )}

      {/* Input Box */}
      <InputBox
        onSend={handleSendMessage}
        disabled={isLoading}
        placeholder={isLoading ? 'AI is thinking...' : 'Type your message...'}
      />
    </div>
  );
};

export default ChatInterface;
