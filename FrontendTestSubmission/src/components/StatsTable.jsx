import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Link, Tooltip, IconButton } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import LinkIcon from '@mui/icons-material/Link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function StatsTable({ stats }) {
  if (stats.error) {
    return <Typography color="error">{stats.shortcode}: {stats.error}</Typography>;
  }
  // Construct the short URL
  const base = window.location.origin.replace(':3000', ':5000');
  const shortUrl = `${base}/${stats.shortcode}`;
  return (
    <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 4, boxShadow: 3, background: 'rgba(255,255,255,0.85)' }}>
      <Table size="small" sx={{ borderRadius: 4 }}>
        <TableHead>
          <TableRow sx={{ background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)' }}>
            <TableCell><LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Shortcode</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell><AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Created At</TableCell>
            <TableCell><AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Expiry</TableCell>
            <TableCell><BarChartIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Total Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover sx={{ background: 'rgba(227,242,253,0.25)', '&:nth-of-type(even)': { background: 'rgba(252,228,236,0.18)' } }}>
            <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{stats.shortcode}</TableCell>
            <TableCell sx={{ wordBreak: 'break-all' }}>
              <Tooltip title="Open original URL in new tab">
                <Link href={stats.original_url} target="_blank" rel="noopener" underline="hover">
                  {stats.original_url}
                  <IconButton size="small" sx={{ ml: 0.5 }}><OpenInNewIcon fontSize="inherit" /></IconButton>
                </Link>
              </Tooltip>
            </TableCell>
            <TableCell sx={{ wordBreak: 'break-all' }}>
              <Tooltip title="Open short URL in new tab">
                <Link href={shortUrl} target="_blank" rel="noopener" underline="hover">
                  {shortUrl}
                  <IconButton size="small" sx={{ ml: 0.5 }}><OpenInNewIcon fontSize="inherit" /></IconButton>
                </Link>
              </Tooltip>
            </TableCell>
            <TableCell>{new Date(stats.created_at).toLocaleString()}</TableCell>
            <TableCell>{new Date(stats.expiry).toLocaleString()}</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'secondary.main' }}>{stats.total_clicks}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}><BarChartIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Click History</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Referrer</TableCell>
                    <TableCell>Country</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.click_history && stats.click_history.length > 0 ? (
                    stats.click_history.map((c, idx) => (
                      <TableRow key={idx} hover sx={{ '&:nth-of-type(even)': { background: 'rgba(227,242,253,0.12)' } }}>
                        <TableCell>{new Date(c.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{c.referrer}</TableCell>
                        <TableCell>{c.country}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>No clicks yet</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StatsTable; 