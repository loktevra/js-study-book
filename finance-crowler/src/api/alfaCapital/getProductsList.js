const httpClient = require('../../services/httpClient');
const alfaCapitalUrls = require('./alfaCapitalUrls');

module.exports = async function getProductsInfo() {
  const response = await httpClient.get(alfaCapitalUrls.getProductsInfoUrl());

  return JSON.parse(response);
}
