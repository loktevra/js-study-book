interface IAlfaCapitalUrlsParams {
  pifAlias: string;
}

export default {
  getProductsInfoUrl: () => 'https://www.alfacapital.ru/api/products/info.json',
  getGraphDataUrl: ({ pifAlias }: IAlfaCapitalUrlsParams) => `https://www.alfacapital.ru/api/pifs/${pifAlias}/graph-data.csv`,
  getStructureUrl: ({ pifAlias }: IAlfaCapitalUrlsParams) => `https://www.alfacapital.ru/api/pifs/${pifAlias}/structure.csv`,
  getActivesUrl: ({ pifAlias }: IAlfaCapitalUrlsParams) => `https://www.alfacapital.ru/api/pifs/${pifAlias}/actives.csv`,
};
