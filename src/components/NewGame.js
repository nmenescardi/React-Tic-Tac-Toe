import React from 'react';
import PropTypes from 'prop-types';

export default class NewGame extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="new-game">
        New Game
      </button>
    );
  }
}

NewGame.propTypes = {
  onClick: PropTypes.func.isRequired
};
