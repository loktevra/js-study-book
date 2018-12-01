import getPifGraph from './getPifGraph';
import getProductsList from './getProductsList';

function alfaCapital() {
  this.add({role: 'alfaCapital', cmd: 'getPifGraph'}, getPifGraph)
  this.add({role: 'alfaCapital', cmd: 'getProductsInfo'}, getProductsList)
}

export default alfaCapital
