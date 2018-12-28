import axios from 'axios';
import * as _ from 'lodash';
import * as parse from 'csv-parse/lib/sync';
import {getRepository} from "typeorm";

import { act } from '../../../libs/senecaPromis';

import PifGraphPointEntity from '../entity/PifGraphPointEntity';
import alfaCapitalUrls from '../utils/alfaCapitalUrls';
import ProductsEntity from '../entity/ProductsEntity';

function needLoad(graph: PifGraphPointEntity[]) {
  if (graph && graph.length) {
    const lastGraph = _.last(graph)
    const dateDiff = +new Date() - +new Date(lastGraph && lastGraph.date || 0);

    return (dateDiff / 24 / 60 / 60 / 1000) > 2 
  }

  return true;
}

interface IGetPifGraphMsg {
  productId: number;
  pifAlias: string;
  minDate: Date;
  maxDate: Date;
}

export default async function getPifGraph({ args }: any, done) {
  if (!args || !args.query) {
    return done({ satus: 'error', errors: [{ message: 'Должны быть указаны аргументы'}]})
  }

  const {
    pifAlias,
    productId,
    minDate = -Infinity,
    maxDate = Infinity,
  } = args.query as IGetPifGraphMsg;
  
  const repository = getRepository(PifGraphPointEntity);
  const products = await act<ProductsEntity[]>({role: 'alfaCapital', cmd: 'getProductsInfo'});
  const product = products.find(({ alias, id }) => pifAlias ? alias === pifAlias : id == productId);
  if (product) {
    const graph = await repository.find({ aliasId: product.id });
    if (needLoad(graph)) {
      const response = await axios.get<string>(alfaCapitalUrls.getGraphDataUrl({ pifAlias: product.alias })).then(r => r.data);
      const allGraph = parse(response, {
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
      const olderItems = allGraph.filter(({ date }) => date > _.get(_.last(graph), 'date', 0))
      const manager = repository.manager;
      await manager.transaction(async transactionalEntityManager => {
        for (const item of olderItems) {
          await transactionalEntityManager.save(manager.create(PifGraphPointEntity, { ...item, aliasId: product.id }))
        }
    });
    }
    const resultList =  await repository
      .createQueryBuilder()
      .where("aliasId = :aliasId", { aliasId: product.id })
      .andWhere('date BETWEEN :minDate AND :maxDate', { minDate, maxDate})
      .getMany();
    return done(null, resultList);
  }
  return done({ satus: 'error', errors: [{ message: 'product not found'}]})
}
