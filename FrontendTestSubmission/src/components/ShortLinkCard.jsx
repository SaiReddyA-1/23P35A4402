import React, { useState } from 'react';
import { Card, CardContent, Typography, Link, Box, IconButton, Tooltip, Fade } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function ShortLinkCard({ shortUrl, expiry, longUrl }) {
  const [copied, setCopied] = useState(false);
  const base = window.location.origin.replace(':3000', ':5000');
  const fullShortUrl = `${base}/${shortUrl}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <Fade in timeout={600}>
      <Card sx={{ mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)', border: '1px solid #e0e0e0', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.025)', boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.22)' } }}>
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
              <Link href={fullShortUrl} target="_blank" rel="noopener" underline="hover">
                {fullShortUrl}
              </Link>
            </Typography>
            <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} arrow>
              <IconButton onClick={handleCopy} color={copied ? 'success' : 'primary'} size="small" sx={{ ml: 1 }}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Expires: {new Date(expiry).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default ShortLinkCard; 