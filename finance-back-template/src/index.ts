import { connect, Payload } from 'ts-nats';

async function main() {
  try {
    const nc = await connect({ servers: ['nats://0.0.0.0:4222'], payload: Payload.JSON});
    await nc.subscribe('mcs/template', (err, msg) => {
      if(err) {   
        console.error(err);
      } else if (msg.reply) {
        nc.publish(msg.reply, 'Hello, world!'); 
      }
  });
  } catch (error) {
    console.error(error);
  }
}

main();
