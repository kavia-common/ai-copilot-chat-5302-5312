/**
 * MessageBubble Component
 * Displays individual chat messages with role-based styling and markdown rendering
 */

import React from 'react';
import { renderMarkdown } from '../utils/markdownRenderer';
import './MessageBubble.css';

/**
 * PUBLIC_INTERFACE
 * MessageBubble component for rendering chat messages
 * @param {Object} props - Component props
 * @param {string} props.role - Message role ('user' or 'assistant')
 * @param {string} props.content - Message content (markdown supported)
 * @param {string} props.timestamp - Optional timestamp
 * @returns {JSX.Element} MessageBubble component
 */
const MessageBubble = ({ role, content, timestamp }) => {
  const isUser = role === 'user';

  return (
    <div className={`message-bubble-container ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
        <div className="message-role">
          {isUser ? '👤 You' : '🤖 AI Copilot'}
        </div>
        <div className="message-content">
          {renderMarkdown(content)}
        </div>
        {timestamp && (
          <div className="message-timestamp">
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
