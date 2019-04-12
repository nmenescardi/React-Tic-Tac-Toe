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
      // Array of movements. Each move has an inner array with the state of the boxes
      moves: [
        {
          boxes: Array(9).fill(null)
        }
      ],

      // Controls the next turn:
      xIsNext: true,

      // Number of moves. Used to navigate back and forward between moves
      moveNum: 0
    };
  }

  handleClick(i) {
    // Get a copy of the movements in the position number selected (if navigating between them ) or in the las position (last move).
    const moves = this.state.moves.slice(0, this.state.moveNum + 1);

    // The last position is the desire to store the current move
    const current = moves[moves.length - 1];

    // Using slice() to create a copy of the boxes inner array
    const boxes = current.boxes.slice();

    if (this.calculateWinner(boxes) || boxes[i]) {
      // If already was a winner or the box was already clicked -> do nothing
      return;
    }

    // Switch between players markups
    boxes[i] = this.state.xIsNext ? 'X' : 'O';

    // Concat() doesn't mutate the original array (push() method does)
    this.setState({
      moves: moves.concat([
        {
          boxes
        }
      ]),
      xIsNext: !this.state.xIsNext,
      moveNum: moves.length
    });
  }

  jumpTo(moveNumber) {
    this.setState({
      moveNum: moveNumber,
      xIsNext: moveNumber % 2 === 0
    });
  }

  calculateWinner(boxes) {
    // Array with possible combination for winning the game
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // TODO: use a HO function
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        return boxes[a];
      }
    }
    return null;
  }

  render() {
    const moves = this.state.moves;
    const current = moves[this.state.moveNum];
    const winner = this.calculateWinner(current.boxes);

    // TODO: Use navigation arrows instead
    const movesButtons = moves.map((step, move) => {
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
              <ol>{movesButtons}</ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
