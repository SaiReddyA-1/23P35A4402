const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // No console.log, so write to a file instead
  require('fs').appendFileSync('server_start.log', `Server started on port ${PORT} at ${new Date().toISOString()}\n`);
}); 