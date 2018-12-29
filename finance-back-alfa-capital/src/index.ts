import web from './alfaCapital';
import { seneca } from './senecaPromis';

seneca
  .client({
    port: 9001,
    pin: 'role:web',
  })
  .use(web)
  .listen({
    port: 9002,
    pin: 'role:alfaCapital',
  })
