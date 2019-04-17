import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ButtonFAIcon extends React.Component {
  render() {
    const { onClick, label, extraClasses, iconClass } = this.props;

    return (
      <div className="button-fa-container">
        <button onClick={onClick} className={classnames('btn', extraClasses)}>
          {iconClass && <i className={classnames('fas', iconClass)} />}
          <span className="button-label">{label}</span>
        </button>
      </div>
    );
  }
}

ButtonFAIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  extraClasses: PropTypes.string,
  iconClass: PropTypes.string
};
