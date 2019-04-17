import React from 'react';
import Box from './Box';

export default class Panel extends React.Component {
  render() {
    const { winningLine, boxes, onClick } = this.props;
    return (
      <div className="panel-inner-container">
        {[...Array(9)].map((e, i) => {
          let highlighted = false;
          if (winningLine && winningLine.includes(i)) {
            highlighted = true;
          }
          return (
            <Box
              key={i}
              value={boxes[i]}
              highlighted={highlighted}
              onClick={() => onClick(i)}
            />
          );
        })}
      </div>
    );
  }
}
