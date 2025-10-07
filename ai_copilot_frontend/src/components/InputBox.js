import React, { useState, useRef, useEffect } from 'react';
import './InputBox.css';

/**
 * InputBox component provides the chat input interface with send button.
 * Supports enter to send and shift+enter for new line.
 */

// PUBLIC_INTERFACE
/**
 * Renders the chat input box with send functionality.
 * @param {Object} props - Component props
 * @param {Function} props.onSend - Callback function when message is sent
 * @param {boolean} props.disabled - Whether the input is disabled (e.g., while loading)
 * @returns {JSX.Element} The input box component
 */
const InputBox = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    
    if (trimmedMessage && !disabled) {
      onSend(trimmedMessage);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-box-container">
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          ref={textareaRef}
          className="input-textarea"
          placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
        <button
          type="submit"
          className="send-button"
          disabled={disabled || !message.trim()}
          aria-label="Send message"
        >
          {disabled ? (
            <span className="loading-spinner">⏳</span>
          ) : (
            <span className="send-icon">📤</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputBox;
