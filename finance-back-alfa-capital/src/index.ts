import { connect, Payload } from 'ts-nats';
import { createConnection } from "typeorm";

import getPifGraph from './actions/getPifGraph';
import getProductsList from './actions/getProductsList';
import PifGraphPointEntity from './entity/PifGraphPointEntity';
import ProductsEntity from './entity/ProductsEntity';

function callWrapper(callback) {
  return (err, msg) => {
    if (err) {
      console.error(err);
    } else {
      callback(msg.data, msg.reply);
    }
  }
}

function accessResult(nc, result) {
  return callWrapper((data, reply) => {
    nc.publish(reply, { result });
  })
}

async function main() {
  try {
    await createConnection({
      type: "sqlite",
      database:  `${process.env.HOME}/data/AlfaCapital.db`,
      entities: [
        PifGraphPointEntity,
        ProductsEntity,
      ],
      synchronize: true,
      logging: false
    })
    const nc = await connect({ servers: ['nats://0.0.0.0:4222'], payload: Payload.JSON});
    console.log('backend alfaCapital start')

    await nc.subscribe('access.alfaCapital.pifGraph', accessResult(nc, { get: true, call: 'get' }));
    await nc.subscribe('call.alfaCapital.pifGraph.get', callWrapper(getPifGraph(nc)));

    await nc.subscribe('access.alfaCapital.productsInfo', accessResult(nc, { get: true, call: 'get'  }));
    await nc.subscribe('call.alfaCapital.productsInfo.get', callWrapper(getProductsList(nc)));
  } catch (error) {
    console.error(error);
  }
}

main();
