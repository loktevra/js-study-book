const sqlite3 = require('sqlite3').verbose();

let db;

const callback = (resolve, reject) => (err, data) => err ? reject(err) : resolve(data);

module.exports = {
  init: ({ path }) => new Promise(function (resolve, reject) {
    db = new sqlite3.Database(path, callback(resolve, reject));
  }),
  run: ({ query, data }) => new Promise(function(resolve, reject) {
    db.run(query, data, callback(resolve, reject));
  }),
  all: ({ query }) => new Promise(function(resolve, reject) {
    db.all(query, callback(resolve, reject));
  }),
  close: () => new Promise(function(resolve, reject) {
    db.close(callback(resolve, reject));
  }),
}
