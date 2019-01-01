import { connect, Payload } from 'ts-nats';

async function main() {
  try {
    const nc = await connect({ servers: ['nats://0.0.0.0:4222'], payload: Payload.JSON});
    await nc.subscribe('dictionary/iso4217/getCurrencyList', (err, msg) => {
      if(err) {   
        console.error(err);
      } else if (msg.reply) {
        nc.publish(msg.reply, `hello there ${msg.data}`); 
      }
  });
  } catch (error) {
    console.error(error);
  }
}

main();
