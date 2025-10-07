export const THEMES = {
  champagne: {
    name: 'Champagne',
    vars: {
      '--color-primary': '#D97706',
      '--color-secondary': '#F3F4F6',
      '--color-success': '#10B981',
      '--color-error': '#EF4444',
      '--color-background': '#FFFBEB',
      '--color-surface': '#FFFFFF',
      '--color-text': '#374151',
      '--color-muted': '#6B7280',
      '--color-border': '#E5E7EB',
      '--gradient-amber-50': '#FFFBEB',
      '--gradient-amber-200': '#FDE68A',
      '--header-height': '64px',
    },
  },
  dark: {
    name: 'Dark',
    vars: {
      '--color-primary': '#F59E0B',
      '--color-secondary': '#111827',
      '--color-success': '#10B981',
      '--color-error': '#EF4444',
      '--color-background': '#0B0F19',
      '--color-surface': '#111827',
      '--color-text': '#E5E7EB',
      '--color-muted': '#9CA3AF',
      '--color-border': '#1F2937',
      '--gradient-amber-50': '#1F2937',
      '--gradient-amber-200': '#111827',
      '--header-height': '64px',
    },
  },
};

/**
 * PUBLIC_INTERFACE
 * applyThemeToDocument
 * Applies a theme by setting CSS variables on the documentElement.
 */
export function applyThemeToDocument(theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
}
