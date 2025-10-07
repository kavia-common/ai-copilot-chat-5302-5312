import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './MessageBubble.css';

/**
 * MessageBubble component displays a single chat message with markdown rendering
 * and syntax highlighting for code blocks.
 */

// PUBLIC_INTERFACE
/**
 * Renders a chat message bubble with markdown support and code highlighting.
 * @param {Object} props - Component props
 * @param {Object} props.message - The message object
 * @param {string} props.message.role - The role (user/assistant/system)
 * @param {string} props.message.content - The message content
 * @param {string} [props.message.timestamp] - Optional timestamp
 * @returns {JSX.Element} The rendered message bubble
 */
const MessageBubble = ({ message }) => {
  const { role, content, timestamp } = message;
  const isUser = role === 'user';
  const isAssistant = role === 'assistant';

  // Format timestamp if available
  const formatTime = (ts) => {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-bubble ${role}`}>
      <div className="message-header">
        <span className="message-role">
          {isUser ? '👤 You' : isAssistant ? '🤖 AI Assistant' : '⚙️ System'}
        </span>
        {timestamp && <span className="message-time">{formatTime(timestamp)}</span>}
      </div>
      <div className="message-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageBubble;
