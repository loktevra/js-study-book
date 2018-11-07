const dbClient = require('../../services').dbClient;

module.exports = async function getGraph(aliasId) {
  const graph = await dbClient.all({
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
}
