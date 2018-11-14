const dbClient = require('../../services').dbClient;

module.exports = async function getGraph({ aliasId, minDate }) {
  const graph = await dbClient.all({
    query: `SELECT 
      aliasId,
      date,
      price,
      scha
      FROM alfaCapitalPifsGraphs
      WHERE aliasId LIKE ${aliasId} AND date >= ${+new Date(minDate) || 0}
      ORDER BY date;
    `,
  })

  return graph;
}
