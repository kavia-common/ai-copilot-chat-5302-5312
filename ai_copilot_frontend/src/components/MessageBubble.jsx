import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import './MessageBubble.css';
import 'highlight.js/styles/atom-one-dark.css';

/**
 * PUBLIC_INTERFACE
 * Message bubble component for displaying chat messages.
 * 
 * Renders messages with markdown support, code syntax highlighting,
 * and role-specific styling (user, assistant, system).
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Message object with id, role, and content
 */
function MessageBubble({ message }) {
  const { role, content } = message;

  return (
    <div className={`message-bubble message-${role}`}>
      <div className="message-avatar">
        {role === 'user' ? '👤' : role === 'assistant' ? '🤖' : 'ℹ️'}
      </div>
      <div className="message-content">
        <div className="message-role">
          {role === 'user' ? 'You' : role === 'assistant' ? 'AI Copilot' : 'System'}
        </div>
        <div className="message-text">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <div className="code-block-wrapper">
                    {match && (
                      <div className="code-language-badge">
                        {match[1]}
                      </div>
                    )}
                    <pre className={className}>
                      <code {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="inline-code" {...props}>
                    {children}
                  </code>
                );
              },
              a({ node, children, ...props }) {
                return (
                  <a {...props} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
