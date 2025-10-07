import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'ai_copilot_session_id';

/**
 * Session manager utility for handling chat session persistence.
 * Manages session IDs using browser sessionStorage.
 */

// PUBLIC_INTERFACE
/**
 * Get the current session ID from sessionStorage, or create a new one if it doesn't exist.
 * @returns {string} The session ID (UUID v4)
 */
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
};

// PUBLIC_INTERFACE
/**
 * Clear the current session ID and create a new one.
 * @returns {string} The new session ID
 */
export const resetSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
  return getSessionId();
};

// PUBLIC_INTERFACE
/**
 * Check if a session exists.
 * @returns {boolean} True if a session ID exists in storage
 */
export const hasSession = () => {
  return sessionStorage.getItem(SESSION_KEY) !== null;
};
