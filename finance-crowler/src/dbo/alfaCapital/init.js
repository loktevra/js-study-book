const dbClient = require('../../services').dbClient;

module.exports = async function init() {
  await dbClient.run({
    query: `CREATE TABLE IF NOT EXISTS alfaCapitalProducts(
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
    )`
  });
  console.log('Таблица alfaCapitalProducts создана или существует')
  await dbClient.run({
    query: `CREATE TABLE IF NOT EXISTS alfaCapitalPifsGraphs(
      id integer PRIMARY KEY AUTOINCREMENT,
      aliasId integer,
      date integer,
      price integer,
      scha integer
    )`
  });
  console.log('Таблица alfaCapitalPifsGraphs создана или существует')
}
