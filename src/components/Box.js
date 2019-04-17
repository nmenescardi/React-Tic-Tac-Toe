import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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
        onClick={onClick}
      >
        {value}
      </button>
    );
  }
}

Box.defaultProps = {
  highlighted: false
};

Box.propTypes = {
  value: PropTypes.string,
  highlighted: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
