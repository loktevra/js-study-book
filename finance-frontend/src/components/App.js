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
      return getISODate(minDate);
    })(),
    maxDate: getISODate(new Date()),
    productId: null,
  };

  componentDidMount() {
    API.getProducts().then(response => {      
      this.setState({ products: response.data, productId: response.data[0].id });
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
    } = this.state;

    return <>
      <select
        onChange={(e) => {
          this.setState({ productId: e.target.value }, this.changePif);
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
        <Graph value={graph.map(({ date, price }) => [date, price])} columns={['Дата', 'Цена']}/>
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
