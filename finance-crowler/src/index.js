import { seneca } from './libs/senecaPromis';

import alfaCapital from './microservices/alfaCapital';
import iso4217 from './microservices/iso4217';
import web from './microservices/web';

seneca.client()
  .use(web)
  .use(iso4217)
  .use(alfaCapital)
