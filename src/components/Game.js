import React from 'react';
import Panel from './Panel';
import Player from './Player';
import NewGame from './NewGame';
import ResetScores from './ResetScores';
import 'bootstrap/dist/css/bootstrap.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          boxes: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // Using slice() to create a copy of the array
    const boxes = current.boxes.slice();

    if (this.calculateWinner(boxes) || boxes[i]) {
      return;
    }

    boxes[i] = this.state.xIsNext ? 'X' : 'O';

    // Concat() doesn't mutate the original array (push() method does)
    this.setState({
      history: history.concat([
        {
          boxes
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  calculateWinner(boxes) {
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

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.boxes);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    const nextPlayer = this.state.xIsNext ? 'X' : 'O';
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next Player: ${nextPlayer}`;
    }

    const xIsNext = this.state.xIsNext;

    return (
      <div className="main-container">
        <div className="hero-container">
          <div className="container title-container">
            <h2 className="next-turn-indicator text-center">
              Next Turn:
              <span className="player-turn font-italic">{` Player ${nextPlayer}`}</span>
            </h2>
          </div>
        </div>
        <div className="game-container">
          <div className="container">
            <div className="row">
              <div className="player-container col-md-2">
                <Player playerRef="X" playerActive={xIsNext} totalScore="1" />
              </div>
              <div className="panel-container col-md-8">
                <Panel
                  boxes={current.boxes}
                  onClick={i => this.handleClick(i)}
                />
              </div>
              <div className="player-container col-md-2">
                <Player playerRef="O" playerActive={!xIsNext} totalScore="3" />
              </div>
            </div>
            <div className="new-game-container">
              <NewGame />
            </div>
            <div className="reset-scores-container">
              <ResetScores />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
