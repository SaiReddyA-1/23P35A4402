import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Typography, Container, Box, Tabs, Tab, IconButton, CssBaseline } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import URLShortenerPage from './pages/URLShortenerPage';
import StatsPage from './pages/StatsPage';

function NavTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabValue = location.pathname === '/stats' ? 1 : 0;
  return (
    <Tabs
      value={tabValue}
      onChange={(_, v) => navigate(v === 0 ? '/' : '/stats')}
      centered
      sx={{ mb: 2 }}
    >
      <Tab label="URL Shortener" />
      <Tab label="Statistics" />
    </Tabs>
  );
}

function ColorModeToggle({ mode, toggleMode }) {
  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light theme colors
          primary: {
            main: '#1976d2',
            light: '#63a4ff',
            dark: '#004ba0',
            contrastText: '#fff',
          },
          secondary: {
            main: '#d81b60',
            light: '#ff5c8d',
            dark: '#a00037',
            contrastText: '#fff',
          },
          background: {
            default: '#f5f5f5',
            paper: '#fff',
          },
          text: {
            primary: '#222',
            secondary: '#555',
          },
        }
      : {
          // Dark theme colors
          primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#1976d2',
            contrastText: '#222',
          },
          secondary: {
            main: '#f48fb1',
            light: '#fce4ec',
            dark: '#d81b60',
            contrastText: '#222',
          },
          background: {
            default: '#181c24',
            paper: '#23283a',
          },
          text: {
            primary: '#f5f5f5',
            secondary: '#bdbdbd',
          },
        }),
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  // Default to light theme
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary', pb: 2, minHeight: '100vh' }}>
          <Container maxWidth="md" sx={{ pt: 4, pb: 2 }}>
            <Typography variant="h3" align="center" gutterBottom fontWeight={700}>
              AffordMed URL Shortener
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
              Shorten up to 5 URLs at once with custom expiry times
            </Typography>
          </Container>
          <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <NavTabs />
              <ColorModeToggle mode={mode} toggleMode={toggleMode} />
            </Container>
          </AppBar>
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<URLShortenerPage />} />
              <Route path="/stats" element={<StatsPage />} />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 