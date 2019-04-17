import React from 'react';
import PropTypes from 'prop-types';

export default class Player extends React.Component {
  render() {
    const { playerRef, playerActive, totalScore } = this.props;

    const styleDisplayActive = playerActive
      ? { display: 'inline-block' }
      : { display: 'none' };

    return (
      <div className="player-inner-container">
        <div className="title-wrapper">
          <h3 className="player-title display-4">
            {`Player ${playerRef} `}
            <span style={styleDisplayActive} className="player-active">
              {' '}
              *
            </span>
          </h3>
        </div>
        <p className="total-score lead">
          Total Score: <span className="score">{totalScore}</span>
        </p>
      </div>
    );
  }
}

Player.defultProps = {
  totalScore: 0
};

Player.propTypes = {
  playerRef: PropTypes.string.isRequired,
  playerActive: PropTypes.bool,
  totalScore: PropTypes.number
};
