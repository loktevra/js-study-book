import React from 'react';
import _ from 'lodash';

class Table extends React.PureComponent {
  render() {
    const {
      value,
    } = this.props;
    const [
      header,
      ...data
    ] = value;
    
    return (
      <table table="1" rules="rows" width={`${header.length * 200}px`} frame="hsides">
        <thead>
          <tr>
            {header.map(name => <th key={_.uniqueId()} align="left">{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={_.uniqueId()}>
              {row.map(value => <td key={_.uniqueId()} align="right">{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Table
