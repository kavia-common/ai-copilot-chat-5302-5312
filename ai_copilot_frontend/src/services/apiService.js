/**
 * API Service for AI Copilot Backend
 * Handles communication with the backend API for chat and session management
 */

// Determine API base URL:
// - In development with proxy: use relative URLs (empty string)
// - In production or when REACT_APP_API_URL is set: use absolute URL
// - Fallback: http://localhost:3001
const getApiBaseUrl = () => {
  // If REACT_APP_API_URL is explicitly set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // In development mode with proxy configured in package.json,
  // use relative URLs to route through the dev server proxy
  if (process.env.NODE_ENV === 'development') {
    return ''; // Empty string for relative URLs
  }
  
  // Fallback for production builds without explicit URL
  return 'http://localhost:3001';
};

const API_BASE_URL = getApiBaseUrl();

// Log the configuration for debugging
console.log('API Service Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  API_BASE_URL: API_BASE_URL,
  using_proxy: API_BASE_URL === '',
});

/**
 * Enhanced fetch wrapper with detailed error logging
 */
const fetchWithLogging = async (url, options = {}) => {
  const fullUrl = `${API_BASE_URL}${url}`;
  console.log('API Request:', {
    url: fullUrl,
    method: options.method || 'GET',
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await fetch(fullUrl, options);
    
    console.log('API Response:', {
      url: fullUrl,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      timestamp: new Date().toISOString(),
    });

    return response;
  } catch (error) {
    console.error('Network Error:', {
      url: fullUrl,
      error: error.message,
      type: error.name,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
};

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
    const response = await fetchWithLogging('/api/chat', {
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
      const errorMessage = errorData.detail || `HTTP error! status: ${response.status}`;
      console.error('API Error Response:', {
        status: response.status,
        errorData,
        timestamp: new Date().toISOString(),
      });
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Chat response received:', {
      session_id: data.session_id,
      reply_length: data.reply?.length,
      timestamp: new Date().toISOString(),
    });
    return data;
  } catch (error) {
    console.error('Error sending message:', {
      error: error.message,
      sessionId,
      timestamp: new Date().toISOString(),
    });
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
    const response = await fetchWithLogging(`/api/sessions/${sessionId}`, {
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
    const response = await fetchWithLogging(`/api/sessions/${sessionId}`, {
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
 * @returns {Promise<Object>} Health status with details
 */
export const checkHealth = async () => {
  try {
    const response = await fetchWithLogging('/', {
      method: 'GET',
    });
    
    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        healthy: true,
        status: response.status,
        data,
        timestamp: new Date().toISOString(),
      };
    }
    
    return {
      healthy: false,
      status: response.status,
      statusText: response.statusText,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Health check failed:', error);
    return {
      healthy: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};
