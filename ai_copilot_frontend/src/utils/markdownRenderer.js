/**
 * Markdown Renderer Utility
 * Provides custom rendering for markdown content with syntax highlighting
 */

import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * Custom code block component with syntax highlighting
 */
const CodeBlock = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  return language ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={language}
      PreTag="div"
      customStyle={{
        borderRadius: '8px',
        padding: '16px',
        margin: '12px 0',
        fontSize: '14px',
      }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} style={{
      backgroundColor: '#f5f5f5',
      padding: '2px 6px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '0.9em',
    }}>
      {children}
    </code>
  );
};

/**
 * PUBLIC_INTERFACE
 * Markdown options for markdown-to-jsx
 */
export const markdownOptions = {
  overrides: {
    code: {
      component: CodeBlock,
    },
    pre: {
      component: ({ children }) => <div>{children}</div>,
    },
    a: {
      props: {
        target: '_blank',
        rel: 'noopener noreferrer',
        style: {
          color: '#d97706',
          textDecoration: 'underline',
        },
      },
    },
    h1: {
      props: {
        style: {
          fontSize: '1.8em',
          fontWeight: 'bold',
          marginTop: '16px',
          marginBottom: '12px',
          color: '#374151',
        },
      },
    },
    h2: {
      props: {
        style: {
          fontSize: '1.5em',
          fontWeight: 'bold',
          marginTop: '14px',
          marginBottom: '10px',
          color: '#374151',
        },
      },
    },
    h3: {
      props: {
        style: {
          fontSize: '1.3em',
          fontWeight: 'bold',
          marginTop: '12px',
          marginBottom: '8px',
          color: '#374151',
        },
      },
    },
    ul: {
      props: {
        style: {
          marginLeft: '20px',
          marginTop: '8px',
          marginBottom: '8px',
        },
      },
    },
    ol: {
      props: {
        style: {
          marginLeft: '20px',
          marginTop: '8px',
          marginBottom: '8px',
        },
      },
    },
    li: {
      props: {
        style: {
          marginBottom: '4px',
        },
      },
    },
    p: {
      props: {
        style: {
          marginBottom: '12px',
          lineHeight: '1.6',
        },
      },
    },
    blockquote: {
      props: {
        style: {
          borderLeft: '4px solid #d97706',
          paddingLeft: '16px',
          marginLeft: '0',
          marginTop: '12px',
          marginBottom: '12px',
          color: '#6b7280',
          fontStyle: 'italic',
        },
      },
    },
  },
};

/**
 * PUBLIC_INTERFACE
 * Render markdown content with custom styling
 * @param {string} content - Markdown content to render
 * @returns {JSX.Element} Rendered markdown
 */
export const renderMarkdown = (content) => {
  return <Markdown options={markdownOptions}>{content}</Markdown>;
};
