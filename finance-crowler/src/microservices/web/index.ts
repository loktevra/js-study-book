import * as SenecaWeb from 'seneca-web';
import * as Express from 'express';
import * as senecaWebAdapter from 'seneca-web-adapter-express';

const Routes = [{
  pin: 'role:alfaCapital,cmd:*',
  prefix: '/alfa-capital',
  map: {
    getPifGraph: {
      GET: true,
      name: '/graph'
    },
    getProductsInfo: {
      GET: true,
      name: '/products-info'
    },
  }
}]

function webInit() {
  try {
    const expressApp = Express();
    expressApp.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    })
    this.use(SenecaWeb, {
      routes: Routes,
      adapter: senecaWebAdapter,
      context: expressApp,
    });
  } catch (error) {
    console.error('error in webInit', error)
  }
}

export default webInit;
