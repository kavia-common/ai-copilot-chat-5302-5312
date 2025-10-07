import React, { useCallback, useRef, useState } from 'react';

const PRESETS = [
  { key: 'write', label: 'Write', prefix: 'Please write: ' },
  { key: 'summarize', label: 'Summarize', prefix: 'Summarize: ' },
  { key: 'brainstorm', label: 'Brainstorm', prefix: 'Brainstorm ideas for: ' },
  { key: 'code', label: 'Code', prefix: 'Write code to: ' },
];

/**
 * PUBLIC_INTERFACE
 * ChatInput
 * Multiline input with preset chips. Enter to send, Shift+Enter for newline.
 */
export function ChatInput({ onSend, onPreset, disabled = false, error }) {
  const [text, setText] = useState('');
  const taRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmed = text.trim();
      if (trimmed && onSend) {
        onSend(trimmed);
        setText('');
      }
    }
  }, [text, onSend]);

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed && onSend) {
      onSend(trimmed);
      setText('');
      taRef.current?.focus();
    }
  }, [text, onSend]);

  const handlePreset = useCallback((preset) => {
    if (onPreset) {
      onPreset(preset.key);
    } else {
      setText(prev => preset.prefix + prev);
      taRef.current?.focus();
    }
  }, [onPreset]);

  return (
    <div className="chat-input">
      <div className="preset-row" role="list" aria-label="Prompt presets">
        {PRESETS.map(p => (
          <button
            key={p.key}
            role="listitem"
            type="button"
            className="chip"
            onClick={() => handlePreset(p)}
            disabled={disabled}
            aria-label={`Insert ${p.label} preset`}
            title={p.prefix}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="input-row">
        <textarea
          ref={taRef}
          className="textarea"
          placeholder="Ask AI Copilot anything... (Shift+Enter for newline)"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Message input"
        />
        <button
          type="button"
          className="send-btn"
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </div>

      {error && <div className="error-text" role="alert">{error}</div>}
    </div>
  );
}
