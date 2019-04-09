import React from 'react';

export default class Box extends React.Component {
  render() {
    return (
      <button className="box" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
