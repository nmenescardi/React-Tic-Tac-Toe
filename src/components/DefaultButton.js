import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class DefaultButton extends React.Component {
  render() {
    const { onClick, label, extraClasses } = this.props;

    return (
      <button onClick={onClick} className={classnames('btn', extraClasses)}>
        {label}
      </button>
    );
  }
}

DefaultButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  extraClasses: PropTypes.string
};
