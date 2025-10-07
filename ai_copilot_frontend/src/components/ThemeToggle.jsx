import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ThemeToggle
 * Button to toggle between Champagne and Dark themes.
 */
export function ThemeToggle({ onToggle, themeName }) {
  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={onToggle}
      aria-label={`Toggle theme (current: ${themeName})`}
      title={`Switch theme (current: ${themeName})`}
    >
      {themeName === 'Champagne' ? '🌙' : '☀️'} Theme
    </button>
  );
}
