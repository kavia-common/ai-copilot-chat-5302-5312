/**
 * API Service for AI Copilot Backend
 * Handles communication with the backend API for chat and session management
 */

// Get API URL from environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * PUBLIC_INTERFACE
 * Send a chat message to the AI Copilot backend
 * @param {string} sessionId - Unique session identifier
 * @param {string} message - User's message content
 * @param {Array} history - Optional conversation history
 * @returns {Promise<Object>} Response containing session_id and reply
 */
export const sendMessage = async (sessionId, message, history = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        message: message,
        history: history,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * PUBLIC_INTERFACE
 * Retrieve session history from the backend
 * @param {string} sessionId - Session identifier
 * @returns {Promise<Array>} Array of message objects with role and content
 */
export const getSessionHistory = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching session history:', error);
    throw error;
  }
};

/**
 * PUBLIC_INTERFACE
 * Delete a session and its conversation history
 * @param {string} sessionId - Session identifier to delete
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteSession = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
};

/**
 * PUBLIC_INTERFACE
 * Check if the backend API is healthy and running
 * @returns {Promise<boolean>} True if API is healthy
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};
