import * as SenecaWeb from 'seneca-web';
import * as Express from 'express';
import * as senecaWebAdapter from 'seneca-web-adapter-express';

const Routes = [{
  pin: 'role:alfaCapital,cmd:*',
  prefix: '/alfa-capital',
  map: {
    getPifGraph: {
      GET: true,
      name: '/pif-graph'
    },
    getProductsInfo: {
      GET: true,
      name: '/products-info'
    },
  }
}]

function webInit() {
  try {
    this.use(SenecaWeb, {
      routes: Routes,
      adapter: senecaWebAdapter,
      context: Express(),
    });
  } catch (error) {
    console.error('error in webInit', error)
  }
}

export default webInit;
