const dataBase = require('./dataBase');
const getPifGraph = require('./getPifGraph');

async function getGraph(alias) {
  try {
    const graph = await dataBase.all({
      query: `SELECT 
        alias,
        date,
        price,
        scha
        FROM alfaCapitalPifsGraphs
        WHERE alias LIKE '${alias}';
      `,
    })
  
    return graph;
  } catch(e) {
    console.log(e);
    
    return null
  }

}

function needLoad(graph) {
  if (graph && graph.length) {
    const lastItem = graph[graph.length - 1];
    const dateDiff = new Date() - new Date(lastItem.date);

    return (dateDiff / 24 / 60 / 60 / 1000) > 3 
  }

  return true;
}


module.exports = async function savePifGraphData(alias, title) {
  console.log(`Начата процедура получения табличных данных по ПИФ "${title}"`)
  let graph = await getGraph(alias);

  if (needLoad(graph)) {
    console.log('Данные устарели, загрузка новых')
    const response = await getPifGraph(alias);
    for (const item of response) {
      await dataBase.run({
        query: `INSERT INTO alfaCapitalPifsGraphs(
          alias,
          date,
          price,
          scha
        ) VALUES (?,?,?,?)`,
        data: [
          alias,
          item.date,
          item.price,
          item.scha
        ],
      });
    }
    graph = await getGraph(alias);
  }
  console.log(`Загрузка "${title}" завершена`)
  return graph;
}
