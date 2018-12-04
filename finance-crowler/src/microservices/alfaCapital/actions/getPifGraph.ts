import axios from 'axios';
import * as parse from 'csv-parse/lib/sync';
import {getRepository} from "typeorm";

import { act } from '../../../libs/senecaPromis';

import PifGraphPointEntity from '../entity/PifGraphPointEntity';
import alfaCapitalUrls from '../utils/alfaCapitalUrls';
import { IRespondCreator } from '../interfaces';

interface IGetPifGraphMsg {
  pifAlias: string;
  minDate: Date;
  maxDate: Date;
}

export default ({ getConnection }: IRespondCreator) => async function getPifGraph({ pifAlias, minDate, maxDate  }: IGetPifGraphMsg, done) {
  const repository = getRepository(PifGraphPointEntity);
  const graph = await repository.find({});
  
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
