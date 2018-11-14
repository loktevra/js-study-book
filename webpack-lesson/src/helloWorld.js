import React from 'react';

class HelloWorld extends React.Component {
  render() {
    return React.createElement(
      React.Fragment,
      {},
      'Hello, World!',
    );
    
  }
}

export default HelloWorld
