const dbClient = require('../../services/').dbClient;

module.exports = async function selectProductsInfo() {
  return await dbClient.all({
    query: `SELECT 
      id,
      alias,
      currency,
      maxamount,
      minamount,
      profit,
      profit_date_beg,
      profit_date_end,
      profit_level,
      risklevel,
      subtitle,
      title,
      type,
      url
      FROM alfaCapitalProducts
    `,
  });
}
