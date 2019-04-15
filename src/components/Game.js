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
      moveNum: 0,

      totalWinsPlayerX: 0,
      totalWinsPlayerY: 0,
      gameState: 'PLAYING'
    };
  }

  handleClick(i) {
    // Get a copy of the movements in the position number selected (if navigating between them ) or in the las position (last move).
    const moves = this.state.moves.slice(0, this.state.moveNum + 1);

    // The last position is the desire to store the current move
    const current = moves[moves.length - 1];

    // Using slice() to create a copy of the boxes inner array
    const boxes = current.boxes.slice();

    const gameState = this.state.gameState;
    if (boxes[i] || 'FINISHED' === gameState) return;

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

    const winnerCombination = this.calculateWinner(boxes);
    if (winnerCombination) {
      const winner = current.boxes[winnerCombination[0]];

      // Update total scores
      this.updateTotalScores(winner);
    }
  }

  navigateMoves(offset) {
    this.setState({
      moveNum: this.state.moveNum + offset,
      xIsNext: !this.state.xIsNext
    });
  }

  newGame() {
    this.setState({
      moves: [
        {
          boxes: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      moveNum: 0,
      gameState: 'PLAYING'
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

    for (let currentCombination of winningCombinations) {
      const [pos1, pos2, pos3] = currentCombination;
      if (
        boxes[pos1] &&
        boxes[pos1] === boxes[pos2] &&
        boxes[pos2] === boxes[pos3]
      ) {
        return currentCombination;
      }
    }
    return null;
  }

  updateTotalScores(winner) {
    if ('X' === winner) {
      this.setState({
        totalWinsPlayerX: ++this.state.totalWinsPlayerX,
        totalWinsPlayerY: this.state.totalWinsPlayerY
      });
    } else {
      this.setState({
        totalWinsPlayerX: this.state.totalWinsPlayerX,
        totalWinsPlayerY: ++this.state.totalWinsPlayerY
      });
    }
    this.setState({
      gameState: 'FINISHED'
    });
  }

  render() {
    const moves = this.state.moves;
    const current = moves[this.state.moveNum];
    const currentMovement = this.state.moveNum;

    // Total Score for both players
    const totalWinsPlayerX = this.state.totalWinsPlayerX;
    const totalWinsPlayerY = this.state.totalWinsPlayerY;

    // grab the winning line if there is a winner
    const winnerCombination = this.calculateWinner(current.boxes);

    // Visible UNDO only if the current movement is not the first one.
    const visibleUndo = currentMovement !== 0;

    // Visible REDO only if there is more movements in further positions.
    const totalAmountOfMovements = this.state.moves.length - 1;
    const visibleRedo = totalAmountOfMovements > currentMovement;

    let status = {};
    const nextPlayer = this.state.xIsNext ? 'X' : 'O';

    let winner, playerTurnClass;
    if (winnerCombination) {
      // Get the winner by using the first possition of the winning line
      winner = current.boxes[winnerCombination[0]];

      // There is a winner
      status = {
        intro: 'Winner: ',
        player: winner
      };
    } else {
      // There is NOT a winner. Show which player moves next
      status = {
        intro: 'Next Turn: ',
        player: nextPlayer
      };

      playerTurnClass = `player-${nextPlayer}`;
    }

    const xIsNext = this.state.xIsNext;

    return (
      <div
        className={classnames(
          'main-container',
          { winner: winner },
          `winner-player-${winner}`,
          playerTurnClass
        )}
      >
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
                  onClick={() => this.navigateMoves(-1)}
                  visibility={visibleUndo}
                />
              </div>
              <div className="icon-button-container col-md-2">
                <ButtonWithIcon
                  iconLabel="Redo"
                  iconSVG={icons.redo}
                  pushToRight={true}
                  onClick={() => this.navigateMoves(+1)}
                  visibility={visibleRedo}
                />
              </div>
            </div>
            <div className="row">
              <div className="player-container col-md-2">
                <Player
                  playerRef="X"
                  playerActive={xIsNext}
                  totalScore={totalWinsPlayerX}
                />
              </div>
              <div className="panel-container col-md-8">
                <Panel
                  boxes={current.boxes}
                  onClick={i => this.handleClick(i)}
                  winningLine={winnerCombination}
                />
              </div>
              <div className="player-container col-md-2">
                <Player
                  playerRef="O"
                  playerActive={!xIsNext}
                  totalScore={totalWinsPlayerY}
                />
              </div>
            </div>
            <div className="new-game-container">
              <NewGame onClick={() => this.newGame()} />
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
