import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

const LoadableApp = Loadable({
  loader: () => import('./components/App'),
  loading: () => <>Loading...</>
});

  
const domContainer = document.createElement('div');

document.body.appendChild(domContainer); 

ReactDOM.render(<LoadableApp />, domContainer);
