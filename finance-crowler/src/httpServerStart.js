const http = require('http');

let server;

module.exports = () => new Promise(function httpServerStart(resolve, reject) {
  server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: 'success' }));
    res.end();
  });

  server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

  server.listen(8000, () => {
    console.log('Сервер запущен по адресу: http://localhost:8000/');
    
    resolve();
  });
});
