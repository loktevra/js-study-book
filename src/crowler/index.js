
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
  await dataBase.run({
    query: `CREATE TABLE IF NOT EXISTS alfaCapitalPifsGraphs(
      id integer PRIMARY KEY AUTOINCREMENT,
      alias text,
      date text,
      price integer,
      scha integer
    )`
  });
  let products = await selectProductsInfo();
  if (products.length === 0) {
    console.log('get data')
    await getProductsInfo();
    products = await selectProductsInfo();
  }
  const pifs = products.filter(({ type }) => type === 'pif').filter(({ alias }) => alias !== 'zpif_osk');
  const datas = [];
  for (const pif of pifs[0]) {
    try {
      const response = await getPifGraph(pif.alias);
      const lastItem = response[response.length - 1];
      datas.push({...lastItem, title: pif.title })
    } catch(e) {
      console.log(`Ошибка при чтении name:"${pif.title}" alias:"${pif.alias}"`, e)
    }
  }
  console.table(datas, ['title', 'date', 'price', 'scha'])
  await dataBase.close();
}

main();
