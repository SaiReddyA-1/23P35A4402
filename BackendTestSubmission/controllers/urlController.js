const urlModel = require('../models/urlModel');
const generateShortcode = require('../utils/shortcodeGenerator');
const getCountry = require('../services/geoLocation');
const { DEFAULT_EXPIRY_MINUTES } = require('../config');

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

exports.createShortUrl = async (req, res, next) => {
  try {
    await urlModel.deleteExpiredUrls();
    const { url, shortcode, validity } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing URL' });
    }
    let code = shortcode || generateShortcode();
    let expiry = addMinutes(new Date(), validity ? parseInt(validity) : DEFAULT_EXPIRY_MINUTES);
    expiry = expiry.toISOString();
    const created_at = new Date().toISOString();
    try {
      await urlModel.insertUrl(url, code, created_at, expiry);
    } catch (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Shortcode already exists' });
      }
      throw err;
    }
    res.status(201).json({ shortUrl: code, expiry });
  } catch (err) {
    next(err);
  }
};

exports.redirectShortUrl = async (req, res, next) => {
  try {
    const { shortcode } = req.params;
    const urlData = await urlModel.getUrlByShortcode(shortcode);
    if (!urlData) return res.status(404).json({ error: 'Shortcode not found' });
    if (new Date(urlData.expiry) < new Date()) {
      return res.status(410).json({ error: 'Shortcode expired' });
    }
    await urlModel.incrementClicks(shortcode);
    await urlModel.insertClick(
      shortcode,
      new Date().toISOString(),
      req.get('Referrer') || '',
      getCountry()
    );
    res.redirect(urlData.original_url);
  } catch (err) {
    next(err);
  }
};

exports.getShortUrlStats = async (req, res, next) => {
  try {
    await urlModel.deleteExpiredUrls();
    const { shortcode } = req.params;
    const urlData = await urlModel.getUrlByShortcode(shortcode);
    if (!urlData) return res.status(404).json({ error: 'Shortcode not found' });
    const clicks = await urlModel.getClicksByShortcode(shortcode);
    res.json({
      original_url: urlData.original_url,
      created_at: urlData.created_at,
      expiry: urlData.expiry,
      total_clicks: urlData.clicks,
      click_history: clicks
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllShortUrls = async (req, res, next) => {
  try {
    await urlModel.deleteExpiredUrls();
    const urls = await urlModel.listAll();
    res.json(urls);
  } catch (err) {
    next(err);
  }
}; 