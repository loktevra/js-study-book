const _ = require('lodash');

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
        WHERE alias LIKE '${alias}'
        ORDER BY date;
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
    const dateDiff = new Date() - new Date(_.last(graph).date || 0);

    return (dateDiff / 24 / 60 / 60 / 1000) > 2 
  }

  return true;
}


module.exports = async function savePifGraphData(alias, title) {
  try {
    let graph = await getGraph(alias);
  
    if (needLoad(graph)) {
      console.log('Данные устарели, загрузка новых')
      const response = await getPifGraph(alias);
      const olderItems = response.filter(({ date }) => date > _.get(_.last(graph), 'date', 0))

      for (const item of olderItems) {
        await dataBase.run({
          query: `INSERT INTO alfaCapitalPifsGraphs(alias,date,price,scha) VALUES ("${alias}",${item.date},${item.price},${item.scha});`,
        });
        
      }
      graph = await getGraph(alias);
      console.log(`Данные для "${title}" загружены. Добавлено: ${olderItems.length}`)
    } else {
      console.log(`Данные для "${title}" в актуальном состоянии`)
    }
    return graph;
  } catch (e) {
    console.log(e);
    throw e
  }
}
