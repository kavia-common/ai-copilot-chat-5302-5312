import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

/**
 * PUBLIC_INTERFACE
 * MarkdownRenderer component renders markdown content with GitHub-flavored markdown support
 * and automatic syntax highlighting for code blocks.
 * 
 * @param content - The markdown content to render
 */
export default function MarkdownRenderer({ content }: { content: string }) {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });
  }, [content]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  );
}
