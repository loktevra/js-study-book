import React from 'react';
import { Chart } from "react-google-charts";

class Graph extends React.PureComponent {
  render() {    
    const {
      value,
    } = this.props;

    if (!value || !value.length) {
      return null
    }
    const min = _(_(value).nth(1)).flatten().tail().min();
    const diffs = _(_(value).nth(1)).flatten().tail().map(val => val - min).value(); 

    const rows = _(value).tail().map((row, index) => {
      const [
        date,
        ...columns
      ] = row;

      return [date, ..._.flatten(columns.map((item, i) => [item - diffs[i], item]))]
    }).value();

    const data = [
      [
        { role: 'domain', label:value[0][0]},
        ..._(value[0]).tail().map(item => [
          { type: 'number', label:item},
          { role: 'tooltip', label:''},
        ]).flatten().value(),
      ],
      ...rows,
    ]

    return (
      <Chart 
        chartType="LineChart"
        width="100%"
        height="800px"
        data={data}
        options={{
          title: 'Company Performance',
          curveType: 'none',
          legend: { position: 'bottom' },
          chartArea: {
            height: 700,
            width: '90%',
          }
        }}
      />
    )
  }
}

export default Graph
