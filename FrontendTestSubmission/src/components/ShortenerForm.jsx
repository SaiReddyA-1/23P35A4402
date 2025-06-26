import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Tooltip, InputAdornment, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../services/api';

const initialFields = [{ url: '', validity: '30', shortcode: '', helper: '' }];

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function randomString(len = 4) {
  return Math.random().toString(36).substring(2, 2 + len);
}

function ShortenerForm({ onShorten }) {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = (idx, key, value) => {
    const updated = fields.map((f, i) => (i === idx ? { ...f, [key]: value, helper: '' } : f));
    setFields(updated);
  };

  const addField = () => {
    if (fields.length < 5) setFields([...fields, { url: '', validity: '30', shortcode: '', helper: '' }]);
  };

  const validate = () => {
    const errs = fields.map(f => {
      if (!f.url) return '';
      if (!isValidUrl(f.url)) return 'Invalid URL';
      if (f.validity && (!/^[0-9]+$/.test(f.validity) || parseInt(f.validity) <= 0)) return 'Validity must be a positive integer';
      if (f.shortcode && !/^[a-zA-Z0-9-]+$/.test(f.shortcode)) return 'Shortcode must be alphanumeric or hyphen';
      return '';
    });
    setErrors(errs);
    return errs.every(e => !e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;
    setLoading(true);
    const results = [];
    const updatedFields = [...fields];
    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];
      if (!f.url) continue;
      let attempt = 0;
      let res = null;
      let usedShortcode = f.shortcode;
      let helperMsg = '';
      while (attempt < 2) {
        try {
          res = await api.createShortUrl(f.url, usedShortcode, f.validity);
          break;
        } catch (err) {
          if (err?.error?.toLowerCase().includes('shortcode already exists') && attempt === 0) {
            usedShortcode = (f.shortcode || 'short') + '-' + randomString();
            helperMsg = `Shortcode already exists. Changed to: ${usedShortcode}`;
            attempt++;
          } else {
            res = { error: err?.error || 'Failed to shorten', longUrl: f.url };
            break;
          }
        }
      }
      if (helperMsg) updatedFields[i].helper = helperMsg;
      if (res && res.shortUrl) res.longUrl = f.url;
      results.push(res);
    }
    setFields(updatedFields);
    setLoading(false);
    if (results.every(r => r.error)) setFormError('Network error. Please try again.');
    onShorten(results);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Typography variant="h5" sx={{ mb: 2, mt: 1, fontWeight: 600 }}>
          URL Shortener
        </Typography>
        {fields.map((f, idx) => (
          <Accordion key={idx} defaultExpanded={idx === 0} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>URL {idx + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Long URL *"
                    value={f.url}
                    onChange={e => handleChange(idx, 'url', e.target.value)}
                    fullWidth
                    required
                    error={!!errors[idx]}
                    helperText={errors[idx] || 'Paste the full URL you want to shorten'}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Tooltip title="Leave empty for auto-generation" arrow>
                    <TextField
                      label="Custom Shortcode (Optional)"
                      value={f.shortcode}
                      onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                      fullWidth
                      InputProps={{
                        endAdornment: <InputAdornment position="end">?</InputAdornment>
                      }}
                      helperText={f.helper || 'Alphanumeric or hyphen'}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Tooltip title="Default: 30 minutes" arrow>
                    <TextField
                      label="Validity (Minutes)"
                      value={f.validity}
                      onChange={e => handleChange(idx, 'validity', e.target.value)}
                      fullWidth
                      InputProps={{
                        endAdornment: <InputAdornment position="end">min</InputAdornment>
                      }}
                      helperText="Default: 30 minutes"
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box display="flex" gap={2} mb={2}>
          <Button variant="outlined" onClick={addField} disabled={fields.length >= 5}>
            ADD ANOTHER URL
          </Button>
          <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ minWidth: 200 }}>
            {loading ? 'Shortening...' : 'SHORTEN URLS'}
          </Button>
        </Box>
        {formError && <Alert severity="error">{formError}</Alert>}
      </Box>
    </form>
  );
}

export default ShortenerForm; 