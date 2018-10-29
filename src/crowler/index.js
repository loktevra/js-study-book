
const dataBase = require('./dataBase');
const getProductsInfo = require('./getProductsInfo');
const selectProductsInfo = require('./selectProductsInfo');
const getPifGraph = require('./getPifGraph');



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
  let products = await selectProductsInfo();
  if (products.length === 0) {
    console.log('get data')
    await getProductsInfo();
    products = await selectProductsInfo();
  }
  const pifs = products.filter(({ type }) => type === 'pif')
  const response = await getPifGraph(pifs[0].alias);
  console.log(response)
  await dataBase.close();
}

main();
