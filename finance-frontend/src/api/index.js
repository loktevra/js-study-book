import ResClient from 'resclient';

const client = new ResClient('ws://0.0.0.0:8080/');

async function getProducts() {
  return await client.call('alfaCapital.productsInfo', 'get', { onlyActualPifs: true }).then(r => JSON.parse(r.model.message));
}

async function getGraph({ productId, minDate, maxDate}) {
  return await client.call('alfaCapital.pifGraph', 'get', { productId, minDate, maxDate}).then(r => JSON.parse(r.model.message));
}

async function getCurrencyList() {
  return await client.get('dictionary.iso4217.currencyList').then(r => JSON.parse(r.message));
}


async function getDenominationHistory() {
  return await client.get('dictionary.iso4217.denominationHistory').then(r => JSON.parse(r.message));
}


export {
  getProducts,
  getGraph,
  getCurrencyList,
  getDenominationHistory,
}
