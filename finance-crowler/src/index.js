

const seneca = require('seneca')();

const alfaCapital = require('./microservices/alfaCapital');
const iso4217 = require('./microservices/iso4217');
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
