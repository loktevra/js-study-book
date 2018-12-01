const getPifGraph = require('./getPifGraph');
const getProductsList = require('./getProductsList');

function alfaCapital() {
  this.add({role: 'alfaCapital', cmd: 'getPifGraph'}, getPifGraph)
  this.add({role: 'alfaCapital', cmd: 'getProductsInfo'}, getProductsList)
}

module.exports = alfaCapital
