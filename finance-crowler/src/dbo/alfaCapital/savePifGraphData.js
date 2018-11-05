const dbClient = require('../../services').dbClient;

module.exports = async function savePifGraphData(aliasId, items) {
  for (const item of items) {
    await dbClient.run({
      query: `INSERT INTO alfaCapitalPifsGraphs(aliasId,date,price,scha) VALUES ("${aliasId}",${item.date},${item.price},${item.scha});`,
    });
  }
}
