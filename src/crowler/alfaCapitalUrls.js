module.exports = {
  getProductsInfoUrl: () => 'https://www.alfacapital.ru/api/products/info.json',
  getGrapDataUrl: ({ pifAlias }) => `https://www.alfacapital.ru/api/pifs/${pifAlias}/graph-data.csv`,
  getStructureUrl: ({ pifAlias }) => `https://www.alfacapital.ru/api/pifs/${pifAlias}/structure.csv`,
  getActivesUrl: ({ pifAlias }) => `https://www.alfacapital.ru/api/pifs/${pifAlias}/actives.csv`,
};
