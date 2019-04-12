import React from 'react';
import classnames from 'classnames';

export default class ButtonWithIcon extends React.Component {
  render() {
    const { iconLabel, iconSVG, pushToRight, onClick, visibility } = this.props;
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
        <span className="button-label">{iconLabel}</span>
      </div>
    );
  }
}
