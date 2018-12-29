import {createConnection} from "typeorm";
import getPifGraph from './actions/getPifGraph';
import getProductsList from './actions/getProductsList';
import PifGraphPointEntity from './entity/PifGraphPointEntity';
import ProductsEntity from './entity/ProductsEntity';

function alfaCapital() {
  try {
    this.add({ init: 'alfaCapital' }, async (msg, done) => {
      await createConnection({
        type: "sqlite",
        database:  `${process.env.HOME}/data/AlfaCapital.db`,
        entities: [
          PifGraphPointEntity,
          ProductsEntity,
        ],
        synchronize: true,
        logging: false
      })
      done();
    })
  
    this.add({role: 'alfaCapital', cmd: 'getPifGraph'}, getPifGraph)
    this.add({role: 'alfaCapital', cmd: 'getProductsInfo'}, getProductsList)
    this.act('role:web', {
      routes: [{
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
    })
    
  } catch (error) {
    console.log(error)
  }
}

export default alfaCapital
