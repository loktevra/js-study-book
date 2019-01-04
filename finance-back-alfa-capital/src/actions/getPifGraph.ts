import axios from 'axios';
import * as _ from 'lodash';
import * as parse from 'csv-parse/lib/sync';
import {getRepository} from "typeorm";
import { Client } from 'ts-nats';

import PifGraphPointEntity from '../entity/PifGraphPointEntity';
import alfaCapitalUrls from '../utils/alfaCapitalUrls';
import { prepareSuccessAnswer, prepareFailAnswer } from '../utils/prepareAnswer';

function needLoad(graph: PifGraphPointEntity[]) {
  if (graph && graph.length) {
    const lastGraph = _.last(graph)
    const dateDiff = +new Date() - +new Date(lastGraph && lastGraph.date || 0);

    return (dateDiff / 24 / 60 / 60 / 1000) > 2 
  }

  return true;
}

interface IActionResponse<P> {
  status: 'success' | 'fail';
  data: P;
}

interface IGetPifGraphMsg {
  productId: number;
  pifAlias: string;
  minDate: Date;
  maxDate: Date;
}

export default function getPifGraph(natsClient: Client) {
  return async ({ params }, reply) => {
    try {
      const {
        pifAlias,
        productId,
        minDate = -Infinity,
        maxDate = Infinity,
      } = params as IGetPifGraphMsg;
      
      const repository = getRepository(PifGraphPointEntity);
      const productsInfoResponse = await natsClient.request('call.alfaCapital.productsInfo.get').then(r => JSON.parse(r.data.result.model.message));
      const product = productsInfoResponse.data.find(({ alias, id }) => pifAlias ? alias === pifAlias : id == productId);
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
        const resultList = await repository
          .createQueryBuilder()
          .where("aliasId = :aliasId", { aliasId: product.id })
          .andWhere('date BETWEEN :minDate AND :maxDate', { minDate: +new Date(minDate), maxDate: +new Date(maxDate) })
          .getMany();
        natsClient.publish(reply, prepareSuccessAnswer(resultList));
      }
      natsClient.publish(reply, prepareFailAnswer([{ message: 'product not found'}]));
    } catch (error) {      
      natsClient.publish(reply, prepareFailAnswer([error]));
    }
  }
}
