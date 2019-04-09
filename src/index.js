import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component {
  render() {
    return (
      <button className="box" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Panel extends React.Component {
  renderBox(i) {
    return (
      <Box value={this.props.boxes[i]} onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          boxes: Array(9).fill(null)
        }
      ],
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const boxes = current.boxes.slice();

    if (calculateWinner(boxes) || boxes[i]) {
      return;
    }

    boxes[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          boxes
        }
      ]),
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.boxes);

    //const winner = calculateWinner(this.state.boxes);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      const nextPlayer = this.state.xIsNext ? 'X' : 'O';
      status = `Next Player: ${nextPlayer}`;
    }

    return (
      <div className="game">
        <div className="game-panel">
          <Panel boxes={current.boxes} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO  */}</ol>
        </div>
      </div>
    );
  }
}

//************************** */

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(boxes) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a];
    }
  }
  return null;
}
