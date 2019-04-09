import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }
  render() {
    return (
      <button className="box" onClick={() => this.setState({ value: 'X' })}>
        {this.state.value}
      </button>
    );
  }
}

class Panel extends React.Component {
  renderBox(i) {
    return <Box value={i} />;
  }

  render() {
    const status = 'Next Player: x';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="panel-row">
          {this.renderBox(0)}
          {this.renderBox(1)}
          {this.renderBox(2)}
        </div>
        <div className="panel-row">
          {this.renderBox(3)}
          {this.renderBox(4)}
          {this.renderBox(5)}
        </div>
        <div className="panel-row">
          {this.renderBox(6)}
          {this.renderBox(7)}
          {this.renderBox(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-panel">
          <Panel />
        </div>
        <div className="game-info">
          <div>{/* TODO status */}</div>
          <ol>{/* TODO  */}</ol>
        </div>
      </div>
    );
  }
}

//************************** */

ReactDOM.render(<Game />, document.getElementById('root'));
