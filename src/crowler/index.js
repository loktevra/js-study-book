
const dataBase = require('./dataBase');
const getProductsInfo = require('./getProductsInfo');
const selectProductsInfo = require('./selectProductsInfo');
const savePifGraphData = require('./savePifGraphData');

async function main() {
  console.log('Запуск программы')
  await dataBase.init({ path : `${process.env.HOME}/data/finance.db` });
  console.log('База данных инициализированна');
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
  console.log('Таблица alfaCapitalProducts создана или существует')
  await dataBase.run({
    query: `CREATE TABLE IF NOT EXISTS alfaCapitalPifsGraphs(
      id integer PRIMARY KEY AUTOINCREMENT,
      alias text,
      date text,
      price text,
      scha text
    )`
  });
  console.log('Таблица alfaCapitalPifsGraphs создана или существует')
  let products = await selectProductsInfo();
  if (products.length === 0) {
    console.log('Начата процедура получения информации по продуктам Альфа-Капитал')
    await getProductsInfo();
    products = await selectProductsInfo();
  }
  console.log('Информация по продуктам Альфа-Капитал считана')
  const pifs = products.filter(({ type }) => type === 'pif').filter(({ alias }) => alias !== 'zpif_osk');
  const datas = [];
  console.log('Начата процедура обновления таблиц данных по ПИФам');
  for (const pif of pifs) {
    try {
      const response = await savePifGraphData(pif.alias, pif.title);
      const lastItem = response[response.length - 1];
      datas.push({...lastItem, title: pif.title })
    } catch(e) {
      console.log(`Ошибка при чтении name:"${pif.title}" alias:"${pif.alias}"`, e)
    }
  }
  console.log('Последняя актуальная информация по ПИФам:')
  console.table(datas, ['title', 'date', 'price', 'scha'])
  await dataBase.close();
}

main();
