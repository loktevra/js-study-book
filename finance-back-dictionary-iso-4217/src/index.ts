import { connect, Payload } from 'ts-nats';

import getCurrencyList from './iso4217';

function callWrapper(callback) {
  return (err, msg) => {
    if (err) {
      console.error(err);
    } else {
      callback(msg.data, msg.reply);
    }
  }
}

async function main() {
  console.log('dictionary.iso4217 start')
  try {
    const nc = await connect({ servers: ['nats://0.0.0.0:4222'], payload: Payload.JSON});
    await nc.subscribe('access.dictionary.iso4217.currencyList', callWrapper((data, reply) => {
      nc.publish(reply, { result: { get: true }});
    }))
    await nc.subscribe('get.dictionary.iso4217.currencyList', callWrapper(getCurrencyList(nc)))
  } catch (error) {
    console.error(error);
  }
}

main();
