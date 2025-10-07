import { useCallback, useState } from 'react';
import { sendMessage } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * useChatApi
 * Manages chat messages and interactions with the backend.
 */
export function useChatApi(sessionId) {
  const [messages, setMessages] = useState([
    {
      id: `m_${Date.now()}`,
      role: 'assistant',
      content: 'Hello! I am your AI Copilot. How can I help you today?',
      ts: Date.now(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pushMessage = useCallback((role, content) => {
    setMessages(prev => [
      ...prev,
      { id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, role, content, ts: Date.now() },
    ]);
  }, []);

  const sendUserMessage = useCallback(async (text) => {
    setError('');
    pushMessage('user', text);
    setLoading(true);
    try {
      const { reply } = await sendMessage(sessionId, { message: text });
      pushMessage('assistant', reply ?? '');
    } catch (e) {
      setError(e?.message || 'Failed to contact server.');
    } finally {
      setLoading(false);
    }
  }, [pushMessage, sessionId]);

  const sendPresetPrompt = useCallback(async (presetKey) => {
    setError('');
    setLoading(true);
    try {
      // Send empty message with preset; backend can use it as instruction
      const { reply } = await sendMessage(sessionId, { message: '', preset: presetKey });
      pushMessage('assistant', reply ?? '');
    } catch (e) {
      setError(e?.message || 'Failed to contact server.');
    } finally {
      setLoading(false);
    }
  }, [pushMessage, sessionId]);

  return {
    messages,
    loading,
    error,
    sendUserMessage,
    sendPresetPrompt,
  };
}
