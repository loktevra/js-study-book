import { connect, Payload } from 'ts-nats';

import { getCurrencyList, getDenominationHistory } from './iso4217';

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
  console.log('dictionary.iso4217 start')
  try {
    const nc = await connect({ servers: ['nats://0.0.0.0:4222'], payload: Payload.JSON});
    await nc.subscribe('access.dictionary.iso4217.currencyList', accessResult(nc, { get: true }));
    await nc.subscribe('get.dictionary.iso4217.currencyList', callWrapper(getCurrencyList(nc)));

    await nc.subscribe('access.dictionary.iso4217.denominationHistory', accessResult(nc, { get: true }));
    await nc.subscribe('get.dictionary.iso4217.denominationHistory', callWrapper(getDenominationHistory(nc)));
  } catch (error) {
    console.error(error);
  }
}

main();
