export const Colors = {
  light: {
    primary: '#7DD3FC', // Light blue
    secondary: '#C4B5FD', // Lavender
    accent: '#86EFAC', // Mint green
    tertiary: '#FBCFE8', // Pale pink
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: '#0EA5E9', // Darker blue
    secondary: '#8B5CF6', // Darker lavender
    accent: '#22C55E', // Darker mint
    tertiary: '#EC4899', // Darker pink
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#334155',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export type ColorScheme = 'light' | 'dark';