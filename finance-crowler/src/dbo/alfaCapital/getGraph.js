const dbClient = require('../../services').dbClient;

module.exports = async function getGraph(props) {
  let expression = '';
  const minDate = +new Date(props.minDate) || 0;
  const maxDate = +new Date(props.maxDate) || 0;
  if (minDate && !maxDate) {
    expression = `AND date >= ${minDate}`;
  } else if (!minDate && maxDate) {
    expression = `AND date <= ${maxDate}`;
  } else if (minDate && maxDate) {
    expression = `AND date BETWEEN ${minDate} AND ${maxDate}`;
  }
  const graph = await dbClient.all({
    query: `SELECT 
      aliasId,
      date,
      price,
      scha
      FROM alfaCapitalPifsGraphs
      WHERE aliasId LIKE ${props.aliasId}
      ${expression}
      ORDER BY date;
    `,
  })

  return graph;
}
