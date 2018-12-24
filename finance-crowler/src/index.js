import { seneca } from './libs/senecaPromis';

import alfaCapital from './microservices/alfaCapital';
import iso4217 from './microservices/iso4217';
import web from './microservices/web';
const main = require('./microservices/main');

require('./serverApi');

seneca.client()
  .use(iso4217)
  .use(alfaCapital)
  .use(main)
  .use(web)
  .ready(() => {
    const server = seneca.export('web/context')()

    server.listen('4000', () => {
      console.log('server started on: 4000')
    })
  })
