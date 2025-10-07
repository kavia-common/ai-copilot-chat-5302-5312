import React from 'react';
import { renderMarkdown } from '../utils/markdown';

/**
 * PUBLIC_INTERFACE
 * MessageBubble
 * Shows a single chat message with role-based styling and markdown content.
 */
export function MessageBubble({ role = 'assistant', content = '', ts }) {
  const isUser = role === 'user';
  return (
    <div className={`message-bubble ${isUser ? 'from-user' : 'from-assistant'}`}>
      <div className="bubble">
        <div className="markdown" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
        {ts && <div className="timestamp" aria-hidden="true">{new Date(ts).toLocaleTimeString()}</div>}
      </div>
    </div>
  );
}
