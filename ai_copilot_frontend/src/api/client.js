/**
 * API client for communicating with the AI Copilot backend.
 * 
 * Handles all HTTP requests to the FastAPI backend, including
 * error handling and response parsing.
 */

// Get API base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

/**
 * PUBLIC_INTERFACE
 * Send a chat message to the backend and receive a response.
 * 
 * @param {string} sessionId - The session identifier
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Promise<Object>} Response object containing the assistant's message
 * @throws {Error} If the request fails or returns an error
 */
export async function sendChatMessage(sessionId, messages) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        messages: messages.map(msg => ({
          id: msg.id,
          role: msg.role,
          content: msg.content
        }))
      })
    });

    if (!response.ok) {
      let errorMessage = `Server error: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.error || errorMessage;
      } catch {
        // If parsing fails, use default error message
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to backend. Please ensure the server is running on ' + API_BASE_URL);
    }
    throw error;
  }
}

/**
 * PUBLIC_INTERFACE
 * Check the health status of the backend API.
 * 
 * @returns {Promise<Object>} Health status object
 * @throws {Error} If the request fails
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error('Unable to connect to backend: ' + error.message);
  }
}

/**
 * PUBLIC_INTERFACE
 * Delete a chat session.
 * 
 * @param {string} sessionId - The session identifier to delete
 * @returns {Promise<Object>} Deletion confirmation
 * @throws {Error} If the request fails
 */
export async function deleteSession(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/session/${sessionId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      let errorMessage = `Failed to delete session: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch {
        // Use default error message
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error('Unable to delete session: ' + error.message);
  }
}
