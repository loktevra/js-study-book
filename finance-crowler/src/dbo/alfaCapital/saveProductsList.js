const dbClient = require('../../services').dbClient;

module.exports = async function getProductsList(alfaCapitalProductsList) {
  await dbClient.run({
    query: `INSERT INTO alfaCapitalProducts(
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
    ) VALUES ${alfaCapitalProductsList.map(()=> '(?,?,?,?,?,?,?,?,?,?,?,?,?)').join(',')}`,
    data: alfaCapitalProductsList.map((item) => [
      item.alias,
      item.currency,
      item.maxamount,
      item.minamount,
      item.profit,
      item['profit.date_beg'],
      item['profit.date_end'],
      item.profitLevel,
      item.risklevel,
      item.subtitle,
      item.title,
      item.type,
      item.url
    ]).reduce((a, b) => a.concat(b)),
  });
}
