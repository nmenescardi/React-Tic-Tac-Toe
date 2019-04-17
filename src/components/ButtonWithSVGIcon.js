import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class ButtonWithSVGIcon extends React.Component {
  render() {
    const { iconSVG, pushToRight, onClick, visibility } = this.props;
    return (
      <div
        className={classnames(
          'button-inner-container',
          {
            'push-right': pushToRight
          },
          { disabled: !visibility }
        )}
        onClick={visibility ? onClick : null}
      >
        {iconSVG}
        {/* <span className="button-label">{iconLabel}</span> */}
      </div>
    );
  }
}

ButtonWithSVGIcon.defaultProps = {
  pushToRight: false,
  visibility: false
};

ButtonWithSVGIcon.propTypes = {
  iconLabel: PropTypes.string.isRequired,
  pushToRight: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  visibility: PropTypes.bool
};
