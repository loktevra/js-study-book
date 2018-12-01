const https = require('https');

module.exports = {
  get: (path) => new Promise(function(resolve, reject) {
    https.get(path, (res) => {
      res.setEncoding("utf8");
      let body = '';
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        resolve(body)
      });
    })
  }),
}
