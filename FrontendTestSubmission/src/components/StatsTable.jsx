import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function StatsTable({ stats }) {
  if (stats.error) {
    return <Typography color="error">{stats.shortcode}: {stats.error}</Typography>;
  }
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Shortcode</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Total Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{stats.shortcode}</TableCell>
            <TableCell>{stats.original_url}</TableCell>
            <TableCell>{new Date(stats.created_at).toLocaleString()}</TableCell>
            <TableCell>{new Date(stats.expiry).toLocaleString()}</TableCell>
            <TableCell>{stats.total_clicks}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}>
              <Typography variant="subtitle2">Click History</Typography>
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
                      <TableRow key={idx}>
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