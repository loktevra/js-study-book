
const _ = require('lodash');

const api = require('./api');
const dbo = require('./dbo');
const dbClient = require('./services').dbClient;
const httpServer = require('./services').httpServer;

require('./serverApi');

function needLoad(graph) {
  if (graph && graph.length) {
    const dateDiff = new Date() - new Date(_.last(graph).date || 0);

    return (dateDiff / 24 / 60 / 60 / 1000) > 2 
  }

  return true;
}

async function main() {
  console.log('Запуск программы')

  await dbo.init();
  await dbo.alfaCapital.init();

  let products = await dbo.alfaCapital.getProductsList();
  if (products.length === 0) {
    console.log('Начата процедура получения информации по продуктам Альфа-Капитал')
    const productsList = await api.alfaCapital.getProductsList();
    dbo.alfaCapital.saveProductsList(productsList);
    products = await dbo.alfaCapital.getProductsList();
  }
  console.log('Информация по продуктам Альфа-Капитал считана')

  const pifs = products.filter(({ type }) => type === 'pif').filter(({ alias }) => alias !== 'zpif_osk');
  const datas = [];
  console.log('Начата процедура обновления таблиц данных по ПИФам');
  await dbClient.run({ query: 'BEGIN;' })
  for (const pif of pifs) {
    try {
      let graph;
      try {
        graph = await dbo.alfaCapital.getGraph(pif.id);
      } catch (error) {
        graph = null;
      }

      if (needLoad(graph)) {
        console.log(`Данные ${pif.title} устарели, загрузка новых`)
        const response = await api.alfaCapital.getPifGraph(pif.alias);
        const olderItems = response.filter(({ date }) => date > _.get(_.last(graph), 'date', 0))

        await dbo.alfaCapital.savePifGraphData(pif.id, olderItems);
        console.log(`Добавлено ${olderItems.length}`)

        graph = await dbo.alfaCapital.getGraph(pif.id);
      }
      const lastItem = _.last(graph);
      datas.push({ date: new Date(lastItem.date).toLocaleDateString(), price: lastItem.price / 100, scha: lastItem.scha / 100, title: pif.title })
    } catch(e) {
      console.log(`Ошибка при чтении name:"${pif.title}" alias:"${pif.alias}"`, e)
    }
  }
  await dbClient.run({ query: 'COMMIT;' })
  console.log('Последняя актуальная информация по ПИФам:')
  console.table(datas, ['title', 'date', 'price', 'scha'])

  await httpServer.listen(8000);
  
  // await dbClient.close();
}

main();
