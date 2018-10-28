
const dataBase = require('./dataBase');
const getProductsInfo = require('./getProductsInfo');
const selectProductsInfo = require('./selectProductsInfo');

async function main() {
  await dataBase.init({ path : `${process.env.HOME}/data/finance.db` });
  await dataBase.run({
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
  let rows = await selectProductsInfo();
  if (rows.length === 0) {
    console.log('get data')
    await getProductsInfo();
    rows = await selectProductsInfo();
  }
  console.log(rows.length)
  await dataBase.close();
}

main();
