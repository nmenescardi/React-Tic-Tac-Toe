import React from 'react';
import classnames from 'classnames';
import Panel from './Panel';
import Player from './Player';
import ButtonFAIcon from './ButtonFAIcon';
import { gameStateConst } from '../constants/gameStateConst';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

export default class Game extends React.Component {
  state = {
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
    gameState: gameStateConst.PLAYING
  };

  handleClick(i) {
    // Get a copy of the movements in the position number selected (if navigating between them ) or in the las position (last move).
    const moves = this.state.moves.slice(0, this.state.moveNum + 1);

    // The last position is the desire to store the current move
    const current = moves[moves.length - 1];

    // Using slice() to create a copy of the boxes inner array
    const boxes = current.boxes.slice();

    const gameState = this.state.gameState;
    if (boxes[i] || gameStateConst.WINNER === gameState) return;

    // Switch between players markups
    boxes[i] = this.state.xIsNext ? 'X' : 'O';

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
    } else {
      if (this.state.moveNum === 8) {
        this.setState({
          gameState: gameStateConst.DRAW
        });
      }
    }
  }

  componentDidUpdate() {
    this.playerOMovesHandler();
  }
  playerOMovesHandler() {
    const { moves, moveNum, gameState, xIsNext } = this.state;

    let resultOfPermutation;

    if (!xIsNext && gameState === gameStateConst.PLAYING) {
      this.setState({
        xIsNext: false
      });
      const boxes = moves[moveNum].boxes;

      // 1st - for each empty box, try out if 'player O' has a possible Winning move.
      resultOfPermutation = this.performMovementByPermutation('O', boxes);
      if (resultOfPermutation) return;

      // 2nd - for each empty box, try out if 'player O' can avoid the other player to win.
      resultOfPermutation = this.performMovementByPermutation('X', boxes);
      if (resultOfPermutation) return;

      // 3er - Just random
      const emptyBoxesPos = boxes
        .map((e, i) => (e === null ? i : null))
        .filter(e => e !== null);
      this.handleClick(_.sample(emptyBoxesPos));
    }
  }

  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  performMovementByPermutation(player, boxes) {
    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      if (!box) {
        boxes[i] = player;
        const possibleWinningMove = this.calculateWinner(boxes);
        boxes[i] = null;
        if (possibleWinningMove) {
          this.handleClick(i);
          return true;
        }
      }
    }

    return false;
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
      gameState: gameStateConst.PLAYING
    });
  }

  resetScores() {
    this.setState({
      totalWinsPlayerX: 0,
      totalWinsPlayerY: 0
    });

    this.newGame();
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
        totalWinsPlayerX: this.state.totalWinsPlayerX + 1,
        totalWinsPlayerY: this.state.totalWinsPlayerY
      });
    } else {
      this.setState({
        totalWinsPlayerX: this.state.totalWinsPlayerX,
        totalWinsPlayerY: this.state.totalWinsPlayerY + 1
      });
    }
    this.setState({
      gameState: gameStateConst.WINNER
    });
  }

  render() {
    const {
      moves,
      moveNum,
      totalWinsPlayerX,
      totalWinsPlayerY,
      gameState,
      xIsNext
    } = this.state;
    const current = moves[moveNum];

    // grab the winning line if there is a winner
    const winnerCombination = this.calculateWinner(current.boxes);

    const nextPlayer = xIsNext ? 'X' : 'O';

    let winner, playerTurnClass, status, draw;
    if (winnerCombination) {
      // Get the winner by using the first possition of the winning line
      winner = current.boxes[winnerCombination[0]];

      // There is a winner
      status = {
        intro: 'Winner: ',
        player: winner
      };
    } else {
      // There is NOT a winner.

      // Draw game ?
      if (gameStateConst.DRAW === gameState) {
        draw = true;
        status = {
          intro: 'Game Draw',
          player: ''
        };
      } else {
        // Show which player moves next
        status = {
          intro: 'Next Turn: ',
          player: nextPlayer
        };

        playerTurnClass = `player-${nextPlayer}`;
      }
    }

    return (
      <div
        className={classnames(
          'main-container',
          { draw: draw },
          { winner: winner },
          `winner-player-${winner}`,
          playerTurnClass
        )}
      >
        <div className="hero-container">
          <div className="container title-container">
            <h2 className="next-turn-indicator text-center">
              {status.intro}
              <span className="player-turn font-italic">
                {status.player && ` Player ${status.player}`}
              </span>
            </h2>
          </div>
        </div>
        <div className="game-container pt-5">
          <div className="container">
            <div className="row">
              <div className="player-container col-md-3">
                <Player
                  playerRef="X"
                  playerActive={xIsNext}
                  totalScore={totalWinsPlayerX}
                />
              </div>
              <div className="panel-container col-md-6">
                <Panel
                  boxes={current.boxes}
                  onClick={i => this.handleClick(i)}
                  winningLine={winnerCombination}
                />
              </div>
              <div className="player-container col-md-3">
                <Player
                  playerRef="O"
                  playerActive={!xIsNext}
                  totalScore={totalWinsPlayerY}
                />
              </div>
            </div>
            <div className="new-game-container text-center my-5">
              <ButtonFAIcon
                onClick={() => this.newGame()}
                extraClasses="btn-primary"
                label="New Game"
                iconClass="fa-plus mr-3"
              />
            </div>
            <div className="reset-scores-container text-center my-5">
              <ButtonFAIcon
                onClick={() => this.resetScores()}
                extraClasses="btn-danger"
                label="Reset Scores"
                iconClass="fa-power-off mr-3"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
