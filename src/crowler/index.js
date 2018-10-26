const https = require('https');

const alfaCapitalUrls = require('./alfaCapitalUrls');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(`${process.env.HOME}/chinook.db`, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });
console.log(process.env.HOME)

https.get(alfaCapitalUrls.getProductsInfo.path, (res) => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
        body += data;
    });
    res.on("end", () => {
        console.log(body);
    });
})
