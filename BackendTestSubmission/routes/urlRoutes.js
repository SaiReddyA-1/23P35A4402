const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorturls', urlController.createShortUrl);
router.get('/shorturls', urlController.getAllShortUrls);
router.get('/shorturls/:shortcode', urlController.getShortUrlStats);
router.get('/:shortcode', urlController.redirectShortUrl);

module.exports = router; 