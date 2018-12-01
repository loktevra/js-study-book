const axios = require('axios');

const alfaCapitalUrls = require('./alfaCapitalUrls');

export default async function getProductsInfo(msg, done) {
  const response = await axios.get(alfaCapitalUrls.getProductsInfoUrl());

  done(null, JSON.parse(response));
}
