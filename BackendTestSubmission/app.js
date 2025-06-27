const express = require('express');
const cors = require('cors');
const { logMiddleware } = require('./middlware');
const errorHandler = require('./middlewares/errorHandler');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logMiddleware);
app.use(urlRoutes);

// Routes will be added here

app.use(errorHandler);

module.exports = app; 