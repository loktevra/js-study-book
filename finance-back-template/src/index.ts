import { connect, Payload } from 'ts-nats';

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
    await nc.subscribe('access.mcs.model', accessResult(nc, { get: true, call: 'get' }));
    await nc.subscribe('call.mcs.model.get', callWrapper((data, reply) => {
      nc.publish(reply, 'Hello, world!'); 
    }));
  } catch (error) {
    console.error(error);
  }
}

main();
