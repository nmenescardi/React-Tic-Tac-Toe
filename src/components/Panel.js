import React from 'react';
import Box from './Box';

export default class Panel extends React.Component {
  renderBox(i) {
    return (
      <Box value={this.props.boxes[i]} onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    return (
      <div className="panel-inner-container">
        {this.renderBox(0)}
        {this.renderBox(1)}
        {this.renderBox(2)}
        {this.renderBox(3)}
        {this.renderBox(4)}
        {this.renderBox(5)}
        {this.renderBox(6)}
        {this.renderBox(7)}
        {this.renderBox(8)}
      </div>
    );
  }
}
