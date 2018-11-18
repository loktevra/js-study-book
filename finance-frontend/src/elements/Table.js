import React from 'react';

import { currency } from '../utils'

class Table extends React.PureComponent {
  render() {
    const {
      value,
    } = this.props;

    return (
      <table table="1" rules="rows" width="400px" frame="hsides">
        <thead>
          <tr>
            <th align="left">Дата</th>
            <th align="right">Цена</th>
            <th align="right">СЧА</th>
          </tr>
        </thead>
        <tbody>
          {value.map(({date, price, scha}) => (
            <tr key={date}>
              <td align="left" width="75">{date.toLocaleDateString('ru-RU',{ year: 'numeric', month: 'numeric', day: 'numeric'})}</td>
              <td align="right">{currency.format(price)}</td>
              <td align="right">{currency.format(scha)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Table
