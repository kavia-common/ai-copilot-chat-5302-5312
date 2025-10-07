import React from 'react';
import { MessageBubble } from './MessageBubble';

/**
 * PUBLIC_INTERFACE
 * ChatWindow
 * Renders a list of messages in order using MessageBubble.
 */
export function ChatWindow({ messages = [] }) {
  return (
    <div className="chat-window">
      {messages.map(msg => (
        <MessageBubble key={msg.id} role={msg.role} content={msg.content} ts={msg.ts} />
      ))}
    </div>
  );
}
