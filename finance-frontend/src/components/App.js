import React from 'react';
import _ from 'lodash';
import Table from '../elements/Table';
import Graph from '../elements/Graph';
import * as API from '../api';

import { getISODate } from '../utils';

class App extends React.Component {
  state = {
    graph: [],
    products: [],
    viewType: 'graph',
    minDate: (() => {
      const minDate = new Date();
      minDate.setMonth(minDate.getMonth() - 3);
      return getISODate(minDate);
    })(),
    maxDate: getISODate(new Date()),
    productId: null,
    selectedProducts: [],
  };

  componentDidMount() {
    API.getCurrencyList().then(console.log)
    API.getProducts().then(response => {      
      this.setState({
        products: response.data,
        selectedProducts: [{
          id: response.data[0].id,
          title: response.data[0].title
        }],
      });
      this.changePif();
    })
  }

  render() {
    const {
      products,
      graph,
      viewType,
      maxDate,
      minDate,
      selectedProducts,
    } = this.state;

    return <>
      <select
        multiple
        onChange={(e) => {
          const values = _.map(e.target.selectedOptions, 'value').map(Number).map(id => ({
            id,
            title: _.find(products, { id }).title
          }))
          this.setState({ selectedProducts: values }, this.changePif);
        }}
      >
        {products.map(({ id, title}) => (
          <option key={id} value={id}>{title}</option>
        ))}
      </select>
      <select onChange={(e) => this.setState({ viewType: e.target.value })}>
        <option value="graph" defaultChecked>График</option>
        <option value="table">Таблица</option>
      </select>
      <br/>
      <br/>
      <form
        onSubmit={this.formHandler}
      >
        <input
          type="date"
          name="minDate"
          value={minDate}
          max={maxDate}
          onChange={(e) => this.setState({ minDate: e.target.value })}
        />
        <input
          type="date"
          name="maxDate"
          value={maxDate}
          min={minDate}
          onChange={(e) => this.setState({ maxDate: e.target.value })}
        />
        <input
          type="submit"
        />
      </form>
      {viewType == 'graph' &&
        <Graph value={graph}/>
      }
      {viewType == 'table' &&
        <Table value={graph}/>
      }
    </>
  }

  formHandler = (e) => {
    e.preventDefault();
    this.changePif();
  }

  changePif = async () => {
    const {
      maxDate,
      minDate,
      selectedProducts,
    } = this.state;
    const responses = (await Promise.all(selectedProducts.map(({ id }) => API.getGraph({ maxDate, minDate, productId: id })))).map(({ data }) => data)
    const graph = _(responses)
      .flatten()
      .groupBy('date')
      .map(items => items.reduce((acc, item) => {
        acc[0] = getISODate(new Date(item.date));
        acc[_.findIndex(selectedProducts, { id: item.aliasId }) + 1] = item.price / 100
        return acc
      }, Array(selectedProducts.length + 1).fill(undefined)))
      .value();
    graph.unshift(['Дата', ...selectedProducts.map(({ title }) => title)]);
    this.setState({
      graph,
    });
    
  }
}

export default App;
