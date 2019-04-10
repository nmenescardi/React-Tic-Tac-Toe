import React from 'react';

export default class Box extends React.Component {
  render() {
    return (
      <button
        className="box-wrapper float-left text-center"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
