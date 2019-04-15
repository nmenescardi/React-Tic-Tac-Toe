import React from 'react';

export default class ResetScores extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="reset-scores">
        Reset Scores
      </button>
    );
  }
}
