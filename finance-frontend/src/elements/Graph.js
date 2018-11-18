import React from 'react';
import { GoogleCharts } from 'google-charts';

class Graph extends React.PureComponent {
  root = React.createRef();
  componentDidMount() {
    this.draw();
  }
  componentDidUpdate() {
    this.draw();
  }
  render() {
    return (
      <div ref={this.root} style={{height: '800px'}}></div>
    )
  }

  draw = () => {
    GoogleCharts.load(() => {
      const data = GoogleCharts.api.visualization.arrayToDataTable([
        ['Дата', 'Цена'],
        ...this.props.value.map(({ date, price, scha }) => [date, price]),
      ]);
  
      const options = {
        title: 'Company Performance',
        curveType: 'none',
        legend: { position: 'bottom' },
        chartArea: {
          height: 700,
          width: '90%',
        }
      };
      
      const chart = new GoogleCharts.api.visualization.LineChart(this.root.current);
      chart.draw(data, options);
    });
  }
}

export default Graph
