import React from 'react';
import { ThemeToggle } from './ThemeToggle';

/**
 * PUBLIC_INTERFACE
 * Header
 * Displays the app title and a theme toggle.
 */
export function Header({ onToggleTheme, themeName }) {
  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <div className="brand">
          <span className="brand-mark">✨</span>
          <h1 className="brand-title">AI Copilot</h1>
        </div>
        <div className="header-actions">
          <ThemeToggle onToggle={onToggleTheme} themeName={themeName} />
        </div>
      </div>
    </header>
  );
}
