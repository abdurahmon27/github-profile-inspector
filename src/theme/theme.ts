import { createTheme, Theme, PaletteMode } from '@mui/material/styles';

interface GlassStyles {
  background: string;
  border: string;
  shadow: string;
}

const getGlassmorphicStyles = (mode: PaletteMode): GlassStyles => {
  const styles: Record<PaletteMode, GlassStyles> = {
    light: {
      background: '#FFFFFF',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    },
    dark: {
      background: '#0A0A0A',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
    },
  };
  return styles[mode];
};

const createAppTheme = (mode: PaletteMode): Theme => {
  const isDark = mode === 'dark';
  const glass = getGlassmorphicStyles(mode);

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#8B5CF6',
        light: '#A78BFA',
        dark: '#7C3AED',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: isDark ? '#A78BFA' : '#8B5CF6',
        light: '#C4B5FD',
        dark: '#7C3AED',
        contrastText: '#FFFFFF',
      },
      background: {
        default: isDark ? '#000000' : '#FFFFFF',
        paper: isDark ? '#0A0A0A' : '#FAFAFA',
      },
      text: {
        primary: isDark ? '#FFFFFF' : '#000000',
        secondary: isDark ? '#A1A1AA' : '#52525B',
      },
      error: {
        main: '#EF4444',
        light: '#F87171',
        dark: '#DC2626',
      },
      success: {
        main: '#10B981',
        light: '#34D399',
        dark: '#059669',
      },
      warning: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
      },
      info: {
        main: '#8B5CF6',
        light: '#A78BFA',
        dark: '#7C3AED',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily:
        '"Space Grotesk Variable", "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: {
        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      h2: {
        fontSize: 'clamp(1.75rem, 4vw, 2rem)',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
      },
      h3: {
        fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '0.9375rem',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
      button: {
        fontWeight: 600,
        letterSpacing: '0.02em',
        textTransform: 'none',
      },
      caption: {
        fontSize: '0.8125rem',
        lineHeight: 1.4,
        letterSpacing: '0.01em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: isDark ? '#000000' : '#FFFFFF',
            minHeight: '100vh',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: glass.background,
            border: glass.border,
            boxShadow: glass.shadow,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: '#8B5CF6',
              boxShadow: isDark
                ? '0 8px 24px rgba(139, 92, 246, 0.3)'
                : '0 8px 24px rgba(139, 92, 246, 0.15)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '8px 20px',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            textTransform: 'none',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            boxShadow: isDark
              ? '0 4px 14px rgba(139, 92, 246, 0.3)'
              : '0 4px 14px rgba(124, 58, 237, 0.25)',
            '&:hover': {
              boxShadow: isDark
                ? '0 6px 20px rgba(139, 92, 246, 0.4)'
                : '0 6px 20px rgba(124, 58, 237, 0.35)',
            },
          },
          sizeSmall: {
            padding: '6px 16px',
            fontSize: '0.8125rem',
          },
          sizeLarge: {
            padding: '10px 24px',
            fontSize: '0.9375rem',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              background: glass.background,
              borderRadius: 12,
              transition: 'all 0.2s ease',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#8B5CF6',
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8B5CF6',
                  borderWidth: 2,
                },
              },
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            minHeight: 44,
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              color: isDark ? '#A78BFA' : '#7C3AED',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
            border: glass.border,
            fontWeight: 500,
            fontSize: '0.8125rem',
            height: 28,
            '&:hover': {
              background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            },
          },
          sizeSmall: {
            height: 24,
            fontSize: '0.75rem',
          },
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            background: isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.15)',
            borderRadius: 8,
            '&::after': {
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.15), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.2), transparent)',
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            border: `2px solid ${isDark ? '#8B5CF6' : '#7C3AED'}`,
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
};

export default createAppTheme;
