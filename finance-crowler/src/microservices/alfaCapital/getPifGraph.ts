import axios from 'axios';
import * as parse from 'csv-parse/lib/sync';

import alfaCapitalUrls from './alfaCapitalUrls';

interface IGetPifGraphMsg {
  pifAlias: string;
}

export default async function getPifGraph({ pifAlias }: IGetPifGraphMsg, done) {
  const response = await axios.get(alfaCapitalUrls.getGraphDataUrl({ pifAlias }));
  const data = parse(String(response), {
    columns: true,
    delimiter: ';',
    cast: (value, options) => {
      if (options.header) {
        return value
      }
      if (options.column === 'date') {
        return +new Date(`${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`)
      }
      const parsedFloat = value.split('.')
      return parseInt(`${parsedFloat[0]}${parsedFloat[1].padEnd(2, '00')}`);
    },
  })
  done(null, data)
}
