const sqlite3 = require('sqlite3');
const path = require('path');

let db;

module.exports = dbPath => new Promise((resolve, reject) => {
  if (db) return resolve(db);

  db = new sqlite3.Database(path.resolve(dbPath), err => {
    if (!err) {
      return resolve(db);
    }

    reject(err);
  });
});

module.exports.reset = () => db = null;
