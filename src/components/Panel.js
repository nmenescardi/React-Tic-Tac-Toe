import React from 'react';
import Box from './Box';

export default class Panel extends React.Component {
  render() {
    return (
      <div className="panel-inner-container">
        {[...Array(9)].map((e, i) => {
          let highlighted = false;
          if (this.props.winningLine && this.props.winningLine.includes(i)) {
            highlighted = true;
          }
          return (
            <Box
              key={i}
              value={this.props.boxes[i]}
              highlighted={highlighted}
              onClick={() => this.props.onClick(i)}
            />
          );
        })}
      </div>
    );
  }
}
