const http = require('http');
const http2 = require('http2');
const fs = require('fs');
const url = require('url');

const dbo = require('./dbo');


let server;

module.exports = () => new Promise(function httpServerStart(resolve, reject) {
  try {
    const options = {
      key: fs.readFileSync(`${process.env.HOME}/data/key.pem`),
      cert: fs.readFileSync(`${process.env.HOME}/data/cert.pem`)
    }
    server = http2.createSecureServer(options,async (req, res) => {
      console.log(`Запрос: ${req.url}`)
      const {
        pathname,
        query,
      } = url.parse(req.url, true)
      if (pathname === '/alfa-capital/products-info') {
        const products = await dbo.alfaCapital.getProductsList();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: 'success', data: products }));
        res.end();
      } else if (pathname === '/alfa-capital/graph') {
        try {
          const graph = await dbo.alfaCapital.getGraph(query.id);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ status: 'success', data: graph }));
          res.end();
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ status: 'fail', errors: [
            {
              code: 400,
              description: String(error),
            }
          ] }));
          res.end();
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: 'fail', errors: [
          {
            code: 404,
            description: http.STATUS_CODES[404],
          }
        ] }));
        res.end();
      }
    });
  
    server.on('clientError', (err, socket) => {
      socket.end('HTTP/2 400 Bad Request\r\n\r\n');
    });
  
    server.listen(8000, () => {
      console.log('Сервер запущен по адресу: http://localhost:8000/');
      resolve();
    });
  } catch(e) {
    reject(e);
  }
});
