import React from 'react';
import classnames from 'classnames';
import Panel from './Panel';
import Player from './Player';
import NewGame from './NewGame';
import ResetScores from './ResetScores';
import ButtonWithIcon from './ButtonWithIcon';
import icons from '../icons/icons';
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
    const currentMovement = this.state.moveNum;
    const winner = this.calculateWinner(current.boxes);

    // Visible UNDO only if the current movement is not the first one.
    const visibleUndo = currentMovement !== 0;

    // Visible REDO only if there is more movements in further positions.
    const totalAmountOfMovements = this.state.moves.length - 1;
    const visibleRedo = totalAmountOfMovements > currentMovement;

    let status = {};
    const nextPlayer = this.state.xIsNext ? 'X' : 'O';
    if (winner) {
      status = {
        intro: 'Winner: ',
        player: winner
      };
    } else {
      status = {
        intro: 'Next Turn: ',
        player: nextPlayer
      };
    }

    const xIsNext = this.state.xIsNext;

    return (
      <div className={classnames('main-container', { winner: winner })}>
        <div className="hero-container">
          <div className="container title-container">
            <h2 className="next-turn-indicator text-center">
              {status.intro}
              <span className="player-turn font-italic">{` Player ${
                status.player
              }`}</span>
            </h2>
          </div>
        </div>
        <div className="game-container">
          <div className="container">
            <div className="row">
              <div className="icon-button-container col-md-2 offset-md-4">
                <ButtonWithIcon
                  iconLabel="Undo"
                  iconSVG={icons.undo}
                  pushToRight={false}
                  onClick={() => this.jumpTo(currentMovement - 1)}
                  visibility={visibleUndo}
                />
              </div>
              <div className="icon-button-container col-md-2">
                <ButtonWithIcon
                  iconLabel="Redo"
                  iconSVG={icons.redo}
                  pushToRight={true}
                  onClick={() => this.jumpTo(currentMovement + 1)}
                  visibility={visibleRedo}
                />
              </div>
            </div>
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
          </div>
        </div>
      </div>
    );
  }
}
