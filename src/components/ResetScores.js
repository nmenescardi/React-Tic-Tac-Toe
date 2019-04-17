import React from 'react';
import PropTypes from 'prop-types';

export default class ResetScores extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="reset-scores">
        Reset Scores
      </button>
    );
  }
}

ResetScores.propTypes = {
  onClick: PropTypes.func.isRequired
};
