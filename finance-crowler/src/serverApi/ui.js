const fs = require('fs');
const path = require('path');

const httpServer = require('../services/httpServer');

async function ui(req, res) {
  try {
    const html = fs.readFileSync(path.resolve(__dirname, '../ui/index.html'), 'UTF-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
  } catch(e) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: 'fail', errors: [
      {
        code: 400,
        description: http.STATUS_CODES[400],
      },
      {
        code: 400,
        description: String(e),
      }
    ] }));

  }
  res.end();
}

httpServer.get('/', ui);
