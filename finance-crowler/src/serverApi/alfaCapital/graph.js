const url = require('url');
const dbo = require('../../dbo');
const httpServer = require('../../services/httpServer');

async function graph(req, res) {
  try {
    const {
      query,
    } = url.parse(req.url, true);
    const {
      id,
      maxDate,
      minDate,
    } = query;

    const graph = await dbo.alfaCapital.getGraph({ aliasId: id, minDate, maxDate });

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
}

httpServer.get('/alfa-capital/graph', graph);
