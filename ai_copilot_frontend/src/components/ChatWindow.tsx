import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MessageBubble from './MessageBubble';
import MarkdownRenderer from './MarkdownRenderer';
import LoadingDots from './LoadingDots';

export type Role = 'user' | 'assistant' | 'system';
export interface Message { id: string; role: Role; content: string; createdAt: string; }

/**
 * PUBLIC_INTERFACE
 * API base URL resolution. The app defaults to http://localhost:3001 if REACT_APP_API_BASE_URL is not provided.
 * Lack of backend availability will not prevent the app from starting; network errors are handled gracefully.
 */
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

/**
 * PUBLIC_INTERFACE
 * ChatWindow component manages the chat interface, session creation, message sending,
 * and communication with the backend API.
 * 
 * Features:
 * - Session-based conversation management
 * - Real-time message sending and receiving
 * - Auto-scroll to latest messages
 * - Loading states during API calls
 */
export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Initialize session on component mount
  useEffect(() => {
    const existing = localStorage.getItem('session_id');
    if (existing) {
      setSessionId(existing);
      return;
    }
    (async () => {
      try {
        const res = await axios.post(`${API_BASE}/api/sessions`);
        setSessionId(res.data.session_id);
        localStorage.setItem('session_id', res.data.session_id);
      } catch (e) {
        console.error('Failed to create session', e);
      }
    })();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  /**
   * Sends a message to the backend API and updates the UI with the response
   */
  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: input, createdAt: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/chat`, { session_id: sessionId, message: userMsg.content });
      // Backend returns { response: string, session_id: string }
      const assistant: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: res.data.response,
        createdAt: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistant]);
    } catch (e) {
      console.error('Chat error', e);
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: 'Sorry, something went wrong. Please try again.', createdAt: new Date().toISOString() }]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles Enter key press to send message (Shift+Enter for new line)
   */
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages" ref={listRef}>
        {messages.map(m => (
          <MessageBubble key={m.id} role={m.role}>
            <MarkdownRenderer content={m.content} />
          </MessageBubble>
        ))}
        {loading && (
          <MessageBubble role="assistant"><LoadingDots /></MessageBubble>
        )}
      </div>
      <div className="composer">
        <textarea
          placeholder="Ask anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="send" onClick={sendMessage} disabled={!input.trim() || !sessionId || loading}>Send</button>
      </div>
    </div>
  );
}
