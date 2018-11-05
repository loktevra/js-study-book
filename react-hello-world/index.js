class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return React.createElement(
      React.Fragment,
      {},
      React.createElement(
        'input',
        {
          placeholder: 'Напишите имя',
          onChange: (e) => this.setState({ text: e.target.value })
        },
      ),
      React.createElement('br'),
      'Hello, ',
      this.state.text || 'World',
      '!',
    );
    
  }
}

const domContainer = document.querySelector('#react_container');

ReactDOM.render(React.createElement(HelloWorld), domContainer);
