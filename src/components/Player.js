import React from 'react';

export default class Player extends React.Component {
  render() {
    const { playerRef, playerActive, totalScore } = this.props;

    const styleDisplayActive = playerActive
      ? { display: 'inline-block' }
      : { display: 'none' };

    return (
      <div className="player-inner-container">
        <div className="title-wrapper">
          <h3 className="player-title">
            {`Player ${playerRef} `}
            <span style={styleDisplayActive} className="player-active">
              {' '}
              *
            </span>
          </h3>
        </div>
        <p className="total-score">
          Total Score: <span className="score">{totalScore}</span>
        </p>
      </div>
    );
  }
}
