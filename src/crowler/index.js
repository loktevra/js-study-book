const https = require('https');

const alfaCapitalUrls = require('./alfaCapitalUrls');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(`${process.env.HOME}/data/finance.db`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});


db.run(`CREATE TABLE IF NOT EXISTS alfaCapitalProducts(
  id integer PRIMARY KEY AUTOINCREMENT,
  alias text,
  currency text,
  maxamount integer,
  minamount integer,
  profit text,
  profit_date_beg text,
  profit_date_end text,
  profit_level integer,
  risklevel integer,
  subtitle text,
  title text,
  type text,
  url text
)`, (err) => {
  if (err) {
    console.log(err.message)
  }
  // getProductsInfo();
  selectProductsInfo();
});


function getProductsInfo() {
  https.get(alfaCapitalUrls.getProductsInfo.path, (res) => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body)
      console.log(body.map((item) => [
        item.alias,
        item.currency,
        item.maxamount,
        item.minamount,
        item.profit,
        item['profit.date_beg'],
        item['profit.date_end'],
        item.profitLevel,
        item.risklevel,
        item.subtitle,
        item.title,
        item.type,
        item.url
      ]).reduce((a, b) => a.concat(b)).length / 13);
      
      db.run(`INSERT INTO alfaCapitalProducts(
        alias,
        currency,
        maxamount,
        minamount,
        profit,
        profit_date_beg,
        profit_date_end,
        profit_level,
        risklevel,
        subtitle,
        title,
        type,
        url
      ) VALUES ${body.map(()=> '(?,?,?,?,?,?,?,?,?,?,?,?,?)').join(',')}`,
      body.map((item) => [
        item.alias,
        item.currency,
        item.maxamount,
        item.minamount,
        item.profit,
        item['profit.date_beg'],
        item['profit.date_end'],
        item.profitLevel,
        item.risklevel,
        item.subtitle,
        item.title,
        item.type,
        item.url
      ]).reduce((a, b) => a.concat(b)),
      () => {
        closeDB();
      })
    });
  })
}

function selectProductsInfo() {
  db.all(`SELECT 
    alias,
    currency,
    maxamount,
    minamount,
    profit,
    profit_date_beg,
    profit_date_end,
    profit_level,
    risklevel,
    subtitle,
    title,
    type,
    url
    FROM alfaCapitalProducts
  `,
  (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(row.map(item => item.title))
  })
}

function closeDB()  {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
}

