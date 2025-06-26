import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Alert, CircularProgress } from '@mui/material';
import api from '../services/api';
import StatsTable from '../components/StatsTable';

function StatsPage() {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllShortUrls()
      .then(async (urls) => {
        if (!urls || urls.length === 0) {
          setStats([]);
          setLoading(false);
          return;
        }
        const statResults = await Promise.all(
          urls.map(async (item) => {
            try {
              const res = await api.getStats(item.shortcode);
              return { shortcode: item.shortcode, ...res };
            } catch {
              return { shortcode: item.shortcode, error: 'Not found or expired' };
            }
          })
        );
        setStats(statResults);
      })
      .catch(() => setError('Network error. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
        URL Shortener Statistics
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : stats.length === 0 ? (
        <Typography color="text.secondary">No active short links found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {stats.map((item, idx) => (
            <Grid item xs={12} key={idx}>
              <StatsTable stats={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default StatsPage; 