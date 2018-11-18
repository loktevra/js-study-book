import { getISODate } from '../utils';

async function createGetRequest(path) {
  const url = new URL(path, 'https://localhost:8000');
  const request = new Request(url)
  const response = await fetch(request);
  const data = await response.json();
  return data;
}

async function getProducts() {
  const response = await createGetRequest('/alfa-capital/products-info?only_actual_pifs=true');
  return response;
}

async function getGraph({ productId, minDate, maxDate}) {
  const response = await createGetRequest(`/alfa-capital/graph?id=${productId}&minDate=${getISODate(minDate)}&maxDate=${getISODate(maxDate)}`);
  return response;
}


export {
  getProducts,
  getGraph,
}
