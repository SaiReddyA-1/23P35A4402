const sqlite3 = require('sqlite3').verbose();
const { DB_PATH } = require('../config');

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    shortcode TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL,
    expiry TEXT NOT NULL,
    clicks INTEGER DEFAULT 0
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shortcode TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    referrer TEXT,
    country TEXT
  )`);
});

module.exports = {
  insertUrl: (original_url, shortcode, created_at, expiry) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO urls (original_url, shortcode, created_at, expiry) VALUES (?, ?, ?, ?)`,
        [original_url, shortcode, created_at, expiry],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, shortcode });
        }
      );
    });
  },
  getUrlByShortcode: (shortcode) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM urls WHERE shortcode = ?`, [shortcode], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },
  incrementClicks: (shortcode) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE urls SET clicks = clicks + 1 WHERE shortcode = ?`, [shortcode], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  insertClick: (shortcode, timestamp, referrer, country) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO clicks (shortcode, timestamp, referrer, country) VALUES (?, ?, ?, ?)`,
        [shortcode, timestamp, referrer, country],
        function (err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  },
  getClicksByShortcode: (shortcode) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM clicks WHERE shortcode = ?`, [shortcode], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },
  listAll: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM urls`, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },
  deleteExpiredUrls: () => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM urls WHERE expiry < ?`, [new Date().toISOString()], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}; 