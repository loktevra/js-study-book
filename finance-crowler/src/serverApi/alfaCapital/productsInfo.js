const url = require('url');
const dbo = require('../../dbo');
const httpServer = require('../../services/httpServer');

async function productsInfo(req, res) {
  const {
    query,
  } = url.parse(req.url, true);

  let products = await dbo.alfaCapital.getProductsList();
  if (query.only_actual_pifs) {
    products = products.filter(({ type }) => type === 'pif').filter(({ alias }) => alias !== 'zpif_osk');
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ status: 'success', data: products }));
  res.end();
}

httpServer.get('/alfa-capital/products-info', productsInfo);
