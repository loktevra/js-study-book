import ResClient from 'resclient';

const client = new ResClient('ws://0.0.0.0:8080/');

async function createGetRequest(path) {
  const url = new URL(path, 'http://localhost:4000');
  const request = new Request(url)
  const response = await fetch(request);
  const data = await response.json();
  return data;
}

async function getProducts() {
  const response = await createGetRequest('/alfa-capital/products-info?onlyActualPifs=true');
  return response;
}

async function getGraph({ productId, minDate, maxDate}) {
  const response = await createGetRequest(`/alfa-capital/graph?productId=${productId}&minDate=${minDate}&maxDate=${maxDate}`);
  return response;
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
