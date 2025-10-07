import React, { useState, useRef, useEffect } from 'react';
import './MessageInput.css';

/**
 * PUBLIC_INTERFACE
 * Message input component for composing and sending chat messages.
 * 
 * Provides a textarea with multiline support (Shift+Enter for new line,
 * Enter to send) and a send button.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSendMessage - Callback function to handle message sending
 * @param {boolean} props.disabled - Whether the input is disabled (e.g., while loading)
 */
function MessageInput({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  /**
   * Handle textarea change.
   */
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  /**
   * Handle message submission.
   */
  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  /**
   * Handle key press in textarea.
   * Enter sends message, Shift+Enter adds new line.
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="message-input-container">
      <div className="message-input-wrapper">
        <textarea
          ref={textareaRef}
          className="message-input"
          placeholder="Type your message... (Shift+Enter for new line)"
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <div className="input-hint">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}

export default MessageInput;
