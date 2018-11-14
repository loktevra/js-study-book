import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './helloWorld';

const domContainer = document.querySelector('#react_container');

ReactDOM.render(
  React.createElement(HelloWorld),
  domContainer
);
