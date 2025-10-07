/**
 * HealthCheck Component
 * Displays backend connection status for debugging 502 errors
 */

import React, { useState, useEffect } from 'react';
import { checkHealth } from '../services/apiService';
import './HealthCheck.css';

/**
 * PUBLIC_INTERFACE
 * HealthCheck component for displaying backend status
 * @param {Object} props - Component props
 * @param {boolean} props.minimal - Show minimal version (default: false)
 * @returns {JSX.Element} HealthCheck component
 */
const HealthCheck = ({ minimal = false }) => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState(null);

  const performHealthCheck = async () => {
    setLoading(true);
    const result = await checkHealth();
    setHealth(result);
    setLastCheck(new Date());
    setLoading(false);
  };

  useEffect(() => {
    // Initial health check
    performHealthCheck();

    // Periodic health check every 30 seconds
    const interval = setInterval(performHealthCheck, 30000);

    return () => clearInterval(interval);
  }, []);

  if (minimal) {
    return (
      <div className={`health-check-minimal ${health?.healthy ? 'healthy' : 'unhealthy'}`}>
        <span className="health-indicator">
          {loading ? '⏳' : health?.healthy ? '✅' : '❌'}
        </span>
        <span className="health-text">
          Backend: {loading ? 'Checking...' : health?.healthy ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    );
  }

  return (
    <div className="health-check-container">
      <div className="health-check-header">
        <h3>🔧 Backend Status</h3>
        <button 
          onClick={performHealthCheck} 
          className="refresh-button"
          disabled={loading}
          title="Refresh health check"
        >
          {loading ? '⏳' : '🔄'}
        </button>
      </div>
      
      <div className={`health-status ${health?.healthy ? 'status-healthy' : 'status-unhealthy'}`}>
        <div className="status-indicator">
          {loading ? '⏳ Checking...' : health?.healthy ? '✅ Healthy' : '❌ Unhealthy'}
        </div>
        
        {health && (
          <div className="health-details">
            <div className="detail-item">
              <strong>Status:</strong> {health.status || 'Unknown'}
            </div>
            {health.statusText && (
              <div className="detail-item">
                <strong>Message:</strong> {health.statusText}
              </div>
            )}
            {health.error && (
              <div className="detail-item error-text">
                <strong>Error:</strong> {health.error}
              </div>
            )}
            {health.data?.message && (
              <div className="detail-item">
                <strong>Backend Message:</strong> {health.data.message}
              </div>
            )}
            {lastCheck && (
              <div className="detail-item timestamp">
                <strong>Last Check:</strong> {lastCheck.toLocaleTimeString()}
              </div>
            )}
          </div>
        )}
      </div>

      {!health?.healthy && (
        <div className="troubleshooting-tips">
          <h4>Troubleshooting Tips:</h4>
          <ul>
            <li>Verify backend is running on the configured port</li>
            <li>Check CORS settings on backend</li>
            <li>Ensure REACT_APP_API_URL environment variable is correct</li>
            <li>Check browser console for network errors</li>
            <li>Try refreshing the page or clearing browser cache</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthCheck;
