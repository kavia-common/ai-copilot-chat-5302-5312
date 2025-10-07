/**
 * InputBox Component
 * Provides textarea input for user messages with send button and loading state
 */

import React, { useState, useRef, useEffect } from 'react';
import './InputBox.css';

/**
 * PUBLIC_INTERFACE
 * InputBox component for message input
 * @param {Object} props - Component props
 * @param {Function} props.onSend - Callback function when message is sent
 * @param {boolean} props.disabled - Whether input is disabled (loading state)
 * @param {string} props.placeholder - Placeholder text for input
 * @returns {JSX.Element} InputBox component
 */
const InputBox = ({ onSend, disabled = false, placeholder = 'Type your message...' }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  /**
   * Handle message submission
   */
  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  /**
   * Handle keyboard events (Enter to send, Shift+Enter for newline)
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="input-box-container">
      <div className="input-box-wrapper">
        <textarea
          ref={textareaRef}
          className="input-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label="Message input"
        />
        <button
          className="send-button"
          onClick={handleSubmit}
          disabled={disabled || !message.trim()}
          aria-label="Send message"
        >
          {disabled ? (
            <span className="loading-spinner">⏳</span>
          ) : (
            <span className="send-icon">📤</span>
          )}
        </button>
      </div>
      <div className="input-hint">
        Press <kbd>Enter</kbd> to send, <kbd>Shift+Enter</kbd> for new line
      </div>
    </div>
  );
};

export default InputBox;
