import React, { useState } from 'react';
import ShortenerForm from '../components/ShortenerForm';
import ShortLinkCard from '../components/ShortLinkCard';
import { Box, Typography, Snackbar, Alert, Grid } from '@mui/material';

function URLShortenerPage() {
  const [results, setResults] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleShorten = (shortLinks) => {
    setResults(shortLinks);
    localStorage.setItem('shortLinks', JSON.stringify(shortLinks));
    if (shortLinks.some(l => l.error)) {
      setSnackbar({ open: true, message: 'Some URLs failed to shorten.', severity: 'error' });
    } else {
      setSnackbar({ open: true, message: 'All URLs shortened successfully!', severity: 'success' });
    }
  };

  return (
    <Box>
      <ShortenerForm onShorten={handleShorten} />
      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Shortened Links</Typography>
          <Grid container spacing={2}>
            {results.map((item, idx) => (
              <Grid item xs={12} key={idx}>
                <ShortLinkCard shortUrl={item.shortUrl} expiry={item.expiry} longUrl={item.longUrl} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default URLShortenerPage; 