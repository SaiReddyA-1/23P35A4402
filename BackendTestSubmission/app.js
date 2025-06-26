const express = require('express');
const cors = require('cors');
const logger = require('../LoggingMiddleware/logger');
const errorHandler = require('./middlewares/errorHandler');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(urlRoutes);

// Routes will be added here

app.use(errorHandler);

module.exports = app; 