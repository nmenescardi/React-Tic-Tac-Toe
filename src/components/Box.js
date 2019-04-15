import React from 'react';
import classnames from 'classnames';

export default class Box extends React.Component {
  render() {
    const playerClass = this.props.value ? `player-${this.props.value}` : '';
    return (
      <button
        className={classnames(
          'box-wrapper',
          'float-left',
          'text-center',
          playerClass,
          {
            highlighted: this.props.highlighted
          }
        )}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
