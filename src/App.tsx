import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import createAppTheme from '@/theme/theme';
import { UserProfilePage } from '@/pages/UserProfilePage';
import { Navbar } from '@/shared/ui';
import { useShare } from '@/shared/hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const { shareProfile } = useShare();

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  const handleShare = () => {
    const currentPath = window.location.pathname;
    const username = currentPath.slice(1);
    if (username) {
      shareProfile(username);
    }
  };

  const showShare = window.location.pathname !== '/';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar onThemeToggle={toggleTheme} onShare={handleShare} showShare={showShare} />
        <Router>
          <Routes>
            <Route path="/" element={<UserProfilePage />} />
            <Route path="/:username" element={<UserProfilePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
