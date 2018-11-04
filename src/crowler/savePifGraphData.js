const _ = require('lodash');

const dataBase = require('./dataBase');
const getPifGraph = require('./getPifGraph');

async function getGraph(aliasId) {
  try {
    const graph = await dataBase.all({
      query: `SELECT 
        aliasId,
        date,
        price,
        scha
        FROM alfaCapitalPifsGraphs
        WHERE aliasId LIKE ${aliasId}
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


module.exports = async function savePifGraphData(aliasId, alias, title) {
  try {
    let graph = await getGraph(aliasId);
  
    if (needLoad(graph)) {
      console.log('Данные устарели, загрузка новых')
      const response = await getPifGraph(alias);
      const olderItems = response.filter(({ date }) => date > _.get(_.last(graph), 'date', 0))

      for (const item of olderItems) {
        await dataBase.run({
          query: `INSERT INTO alfaCapitalPifsGraphs(aliasId,date,price,scha) VALUES ("${aliasId}",${item.date},${item.price},${item.scha});`,
        });
        
      }
      graph = await getGraph(aliasId);
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
