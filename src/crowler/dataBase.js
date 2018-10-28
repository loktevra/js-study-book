const sqlite3 = require('sqlite3').verbose();

let db;

module.exports = {
  init: ({ path }) => new Promise(function (resolve, reject) {
    db = new sqlite3.Database(path, (err) => {
      if (err) {
        reject(err);
      }
      resolve(db);
    });
  }),
  run: ({ query, data }) => new Promise(function(resolve, reject) {
    db.run(query, data, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  }),
  all: ({ query }) => new Promise(function(resolve, reject) {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      }      
      resolve(rows);
    });
  }),
  close: () => new Promise(function(resolve, reject) {
    db.close((err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  }),
}
