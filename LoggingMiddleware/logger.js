const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs.txt');

function logToFile(logEntry) {
  fs.appendFileSync(logFilePath, logEntry + '\n', { encoding: 'utf8' });
}

function logger(req, res, next) {
  const { method, url, params, body } = req;
  const logEntry = JSON.stringify({
    time: new Date().toISOString(),
    method,
    url,
    params,
    body: method === 'POST' ? body : undefined
  });
  logToFile(logEntry);
  next();
}

module.exports = logger; 