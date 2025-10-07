/**
 * API service layer for communicating with the AI Copilot backend.
 * Handles all HTTP requests to the FastAPI server.
 */

// Get backend URL from environment variable or use default
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// PUBLIC_INTERFACE
/**
 * Send a chat message to the AI assistant.
 * @param {Object} params - Request parameters
 * @param {string} params.sessionId - The session identifier
 * @param {string} params.message - The user's message content
 * @returns {Promise<Object>} The chat response with assistant's message
 * @throws {Error} If the request fails or returns an error status
 */
export const sendMessage = async ({ sessionId, message }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        message: {
          role: 'user',
          content: message,
        },
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

// PUBLIC_INTERFACE
/**
 * Retrieve the conversation history for a specific session.
 * @param {string} sessionId - The session identifier
 * @returns {Promise<Object>} Session history with all messages
 * @throws {Error} If the request fails or session is not found
 */
export const getSession = async (sessionId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Session not found is not an error - return empty history
        return { session_id: sessionId, messages: [] };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching session:', error);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Check backend health status.
 * @returns {Promise<Object>} Health status response
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};
