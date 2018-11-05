const alfaCapitalUrls = require('./alfaCapitalUrls');
const httpClient = require('./httpClient');
const dataBase = require('./dataBase');

module.exports = async function getProductsInfo() {
  const response = await httpClient.get(alfaCapitalUrls.getProductsInfoUrl());
  const body = JSON.parse(response)
  await dataBase.run({
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
    ) VALUES ${body.map(()=> '(?,?,?,?,?,?,?,?,?,?,?,?,?)').join(',')}`,
    data: body.map((item) => [
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
