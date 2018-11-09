const dbo = require('../../dbo');
const httpServer = require('../../services/httpServer');

async function productsInfo(req, res) {
  const products = await dbo.alfaCapital.getProductsList();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ status: 'success', data: products }));
  res.end();
}

httpServer.get('/alfa-capital/products-info', productsInfo);
