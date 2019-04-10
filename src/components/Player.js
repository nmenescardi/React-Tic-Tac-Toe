import React from 'react';

export default class Player extends React.Component {
  render() {
    return (
      <div className="player-inner-container">
        <div className="title-wrapper">
          <h3 className="player-title">
            Player X <span className="player-active"> *</span>
          </h3>
        </div>
        <p className="total-score">
          Total Score: <span className="score">0</span>
        </p>
      </div>
    );
  }
}
