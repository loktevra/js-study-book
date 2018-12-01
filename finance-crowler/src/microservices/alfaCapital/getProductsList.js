const httpsClient = require('../../libs/httpClient');

const alfaCapitalUrls = require('./alfaCapitalUrls');

module.exports = async function getProductsInfo(msg, done) {
  const response = await httpsClient.get(alfaCapitalUrls.getProductsInfoUrl());

  done(null, JSON.parse(response));
}
