import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import { sendMessage, getSession, checkHealth } from '../services/api';
import { getSessionId, resetSession } from '../utils/sessionManager';
import './ChatInterface.css';

/**
 * ChatInterface component is the main chat UI that orchestrates the conversation.
 * Manages message history, sending messages, and displaying responses.
 */

// PUBLIC_INTERFACE
/**
 * Main chat interface component.
 * Handles session management, message sending, and UI state.
 * @returns {JSX.Element} The complete chat interface
 */
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Initialize session and load history
  useEffect(() => {
    const initSession = async () => {
      const sid = getSessionId();
      setSessionId(sid);
      
      try {
        // First, check backend health
        try {
          await checkHealth();
          console.log('✅ Backend connection successful');
        } catch (healthErr) {
          console.error('❌ Backend health check failed:', healthErr);
          setError('Cannot connect to backend. Please check if the backend server is running.');
        }
        
        const history = await getSession(sid);
        if (history.messages && history.messages.length > 0) {
          setMessages(history.messages);
        } else {
          // Show welcome message for new sessions
          setMessages([
            {
              role: 'assistant',
              content: '👋 Hello! I\'m your AI Copilot assistant. I can help you with writing, coding, brainstorming, summarizing, and much more. How can I assist you today?',
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error('Error loading session:', err);
        // Start with welcome message if session fetch fails
        setMessages([
          {
            role: 'assistant',
            content: '👋 Hello! I\'m your AI Copilot assistant. How can I help you today?',
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    };

    initSession();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    const userMessage = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    // Add user message to UI immediately
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Send message to backend
      const response = await sendMessage({
        sessionId,
        message: content,
      });

      // Add assistant response
      if (response.message) {
        setMessages((prev) => [...prev, response.message]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message. Please try again.');
      
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: 'system',
          content: `❌ Error: ${err.message || 'Failed to send message. Please try again.'}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    const newSid = resetSession();
    setSessionId(newSid);
    setMessages([
      {
        role: 'assistant',
        content: '👋 New conversation started! How can I help you?',
        timestamp: new Date().toISOString(),
      },
    ]);
    setError(null);
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="header-content">
          <h1 className="chat-title">🤖 AI Copilot Chat</h1>
          <p className="chat-subtitle">Powered by Gemini AI</p>
        </div>
        <button className="new-chat-button" onClick={handleNewChat} title="Start new conversation">
          ✨ New Chat
        </button>
      </div>

      <div className="messages-container" ref={messagesContainerRef}>
        <div className="messages-list">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {isLoading && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <span className="typing-text">AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <InputBox onSend={handleSendMessage} disabled={isLoading} />

      {error && (
        <div className="error-toast">
          {error}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
