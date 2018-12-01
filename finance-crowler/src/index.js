const seneca = require('seneca')();

import alfaCapital from './microservices/alfaCapital';
import iso4217 from './microservices/iso4217';
const main = require('./microservices/main');

require('./serverApi');

seneca
  .use(iso4217)
  .use(alfaCapital)
  .use(main)
  .act({role: 'iso-4217', cmd: 'getCurrencyList'}, (err, msg) => {
    console.log('seneca', err, msg);
  })
  .act({role: 'main', cmd: 'start'}, (err) => {
    if(!err) {
      console.log('Приложение запущено')
    }
  })
