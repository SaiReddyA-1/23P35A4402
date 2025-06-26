import React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

function ShortLinkCard({ shortUrl, expiry, longUrl }) {
  const base = window.location.origin.replace(':3000', ':5000');
  return (
    <Card sx={{ mb: 2, bgcolor: '#f9f9f9', border: '1px solid #e0e0e0' }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Original URL
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: 'break-all', mb: 1 }}>
          {longUrl}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Short URL
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <LinkIcon color="primary" />
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
            <Link href={`${base}/${shortUrl}`} target="_blank" rel="noopener" underline="hover">
              {`${base}/${shortUrl}`}
            </Link>
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Expires: {new Date(expiry).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ShortLinkCard; 