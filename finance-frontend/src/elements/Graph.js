import React from 'react';
import { Chart } from "react-google-charts";

class Graph extends React.PureComponent {
  render() {
    return (
      <Chart 
        chartType="LineChart"
        width="100%"
        height="800px"
        data={[
          this.props.columns,
          ...this.props.value,
        ]}
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
