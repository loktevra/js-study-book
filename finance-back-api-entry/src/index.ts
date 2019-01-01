import * as Seneca from 'seneca';

import web from './web';

Seneca()
  .use(web)
  .listen({
    port: 9001,
    pin: 'role:web',
  })
  .client({
    port: 9002,
    pin: 'role:alfaCapital',
  })
  .client({
    port: 9003,
    pin: 'role:iso-4217',
  })
