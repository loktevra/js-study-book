import * as Seneca from 'seneca';

import iso4217 from './iso4217';

Seneca()
  .client({
    port: 9001,
    pin: 'role:web',
  })
  .use(iso4217)
  .listen({
    port: 9003,
    pin: 'role:iso-4217',
  })
