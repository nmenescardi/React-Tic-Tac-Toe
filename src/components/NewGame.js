import React from 'react';

export default class NewGame extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="new-game">
        New Game
      </button>
    );
  }
}
