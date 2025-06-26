import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Typography, Container, Box, Tabs, Tab } from '@mui/material';
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

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ bgcolor: '#f5f5f5', pb: 2, minHeight: '100vh' }}>
        <Container maxWidth="md" sx={{ pt: 4, pb: 2 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight={700}>
            AffordMed URL Shortener
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            Shorten up to 5 URLs at once with custom expiry times
          </Typography>
        </Container>
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Container maxWidth="md">
            <NavTabs />
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
  );
}

export default App; 