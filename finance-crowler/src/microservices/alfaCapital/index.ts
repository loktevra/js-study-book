import {createConnection} from "typeorm";
import getPifGraph from './getPifGraph';
import getProductsList from './getProductsList';
import PifGraphPointEntity from './PifGraphPointEntity';

createConnection({
  type: "sqlite",
  database:  `${process.env.HOME}/data/AlfaCapital.db`,
  entities: [
    PifGraphPointEntity,
  ],
  synchronize: true,
  logging: false
}).then(connection => {
  console.log('createConnection', connection);
  
}).catch(error => console.log(error));

function alfaCapital() {
  this.add({role: 'alfaCapital', cmd: 'getPifGraph'}, getPifGraph)
  this.add({role: 'alfaCapital', cmd: 'getProductsInfo'}, getProductsList)
}

export default alfaCapital
