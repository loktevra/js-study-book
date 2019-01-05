import { connect, Payload } from 'ts-nats';

import { getDailyForeignCurrencyMarket } from './getDailyForeignCurrencyMarket';

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
    const nc = await connect({ servers: ['nats://0.0.0.0:4222'], payload: Payload.JSON});
    console.log('backend cbr start');
    await nc.subscribe('access.cbr.dailyForeignCurrencyMarket', accessResult(nc, { get: true }));
    await nc.subscribe('get.cbr.dailyForeignCurrencyMarket', callWrapper(getDailyForeignCurrencyMarket(nc)));
  } catch (error) {
    console.error(error);
  }
}

main();
