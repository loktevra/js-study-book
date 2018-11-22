import React from 'react';
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
      return minDate;
    })(),
    maxDate: new Date(),
    productId: null,
  };

  componentDidMount() {
    API.getProducts().then(response => {      
      this.setState({ products: response.data, productId: response.data[0].id });
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      maxDate,
      minDate,
      productId,
    } = this.state;
    if (productId === null) {
      return
    }
    if (
      prevState.productId !== productId
      || prevState.maxDate !== maxDate
      || prevState.minDate !== minDate
    ) {
      this.changePif();
    }
  }

  render() {
    const {
      products,
      graph,
      viewType,
      maxDate,
      minDate,
    } = this.state;

    return <>
      <select onChange={(e) => this.setState({ productId: e.target.value })}>
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
      <input
        type="date"
        name="minDate"
        value={getISODate(minDate)}
        max={getISODate(maxDate)}
        onChange={(e) => this.setState({ minDate: new Date(e.target.value) })}
      />
      <input
        type="date"
        name="maxDate"
        value={getISODate(maxDate)}
        min={getISODate(minDate)}
        onChange={(e) => this.setState({ maxDate: new Date(e.target.value) })}
      /> 
      {viewType == 'graph' &&
        <Graph value={graph.map(({ date, price }) => [date, price])} columns={['Дата', 'Цена']}/>
      }
      {viewType == 'table' &&
        <Table value={graph}/>
      }
    </>
  }

  changePif = () => {
    const {
      maxDate,
      minDate,
      productId,
    } = this.state;
    API.getGraph({ maxDate, minDate, productId }).then(response => {
      this.setState({
        graph: response.data.map(({date, price, scha}) => ({
          date: new Date(date),
          price: price / 100,
          scha: scha / 100,
        })),
      });
    })
  }
}

export default App;
