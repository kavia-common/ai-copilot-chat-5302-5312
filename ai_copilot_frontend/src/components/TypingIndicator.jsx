import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TypingIndicator
 * Shows animated dots while waiting for assistant response.
 */
export function TypingIndicator({ text = 'AI is typing...' }) {
  return (
    <div className="typing-indicator" aria-live="polite">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      <span className="typing-text">{text}</span>
    </div>
  );
}
