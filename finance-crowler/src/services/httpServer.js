const http = require('http');
const http2 = require('http2');
const fs = require('fs');
const url = require('url');

const routesGet = new Map();

module.exports = {
  get(path, callback) {
    routesGet.set(path, callback)
  },
  listen(port) {
    return new Promise(function httpServerStart(resolve, reject) {
      try {
        const options = {
          key: fs.readFileSync(`${process.env.HOME}/data/key.pem`),
          cert: fs.readFileSync(`${process.env.HOME}/data/cert.pem`)
        }
        server = http2.createSecureServer(options,async (req, res) => {
          const {
            pathname,
          } = url.parse(req.url, true)
          if (routesGet.has(pathname)) {
            routesGet.get(pathname)(req, res);
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
      
        server.listen(port, () => {
          console.log(`Сервер запущен по адресу: http://localhost:${port}/`);
          resolve();
        });
      } catch(e) {
        reject(e);
      }
    })
  }
}
