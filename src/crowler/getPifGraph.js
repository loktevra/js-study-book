const parse = require('csv-parse/lib/sync')

const httpClient = require('./httpClient');
const alfaCapitalUrls = require('./alfaCapitalUrls');

module.exports = async function getPifGraph(pifAlias) {
  const response = await httpClient.get(alfaCapitalUrls.getGrapDataUrl({ pifAlias }));
  const data = parse(response, {
    columns: true,
    delimiter: ';',
    cast: (value, options) => {
      if (options.header) {
        return value
      }
      if (options.column === 'date') {
        return `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`
      }
      return value
    },
  })
  return data;
}
