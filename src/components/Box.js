import React from 'react';
import classnames from 'classnames';

export default class Box extends React.Component {
  render() {
    return (
      <button
        className={classnames('box-wrapper', 'float-left', 'text-center', {
          highlighted: this.props.highlighted
        })}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
