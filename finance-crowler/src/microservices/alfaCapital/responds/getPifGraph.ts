import axios from 'axios';
import * as parse from 'csv-parse/lib/sync';

import { act } from '../../../libs/senecaPromis';

import PifGraphPointEntity from '../entity/PifGraphPointEntity';
import alfaCapitalUrls from '../utils/alfaCapitalUrls';
import { IRespondCreator } from '../interfaces';
import { Connection } from 'typeorm';

interface IGetPifGraphMsg {
  pifAlias: string;
}

export default ({ getConnection }: IRespondCreator) => async function getPifGraph({ pifAlias }: IGetPifGraphMsg, done) {
  const connection = getConnection()
  const graph = await connection.manager.find(PifGraphPointEntity);
  
  const response = await axios.get(alfaCapitalUrls.getGraphDataUrl({ pifAlias }));
  const data = parse(response.data, {
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
  console.log(graph, data);
  done(null)
}
