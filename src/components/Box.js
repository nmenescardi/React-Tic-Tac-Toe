import React from 'react';
import classnames from 'classnames';

export default class Box extends React.Component {
  render() {
    const { value, highlighted, onClick } = this.props;
    const playerClass = value ? `player-${value}` : '';
    return (
      <button
        className={classnames(
          'box-wrapper',
          'float-left',
          'text-center',
          playerClass,
          {
            highlighted: highlighted
          }
        )}
        onClick={() => onClick()}
      >
        {value}
      </button>
    );
  }
}
