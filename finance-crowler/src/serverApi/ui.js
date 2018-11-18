const httpServer = require('../services/httpServer');

async function ui(req, res) {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: 'success' }));
    res.end();
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
