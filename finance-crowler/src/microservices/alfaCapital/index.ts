import {createConnection} from "typeorm";
import getPifGraph from './responds/getPifGraph';
import getProductsList from './responds/getProductsList';
import PifGraphPointEntity from './entity/PifGraphPointEntity';

let connection;

function setConnection(connec) {
  connection = connec;
}

function getConnection() {
  return connection
}

function alfaCapital() {
  try {
    this.add({ init: 'alfaCapital' }, async (msg, done) => {
      const connection = await createConnection({
        type: "sqlite",
        database:  `${process.env.HOME}/data/AlfaCapital.db`,
        entities: [
          PifGraphPointEntity,
        ],
        synchronize: true,
        logging: false
      })
      setConnection(connection)
      done();
    })
  
    this.add({role: 'alfaCapital', cmd: 'getPifGraph'}, getPifGraph({ getConnection }))
    this.add({role: 'alfaCapital', cmd: 'getProductsInfo'}, getProductsList({ getConnection }))
    
  } catch (error) {
    console.log(error)
  }
}

export default alfaCapital
