import React from 'react';
import Box from './Box';

export default class Panel extends React.Component {
  render() {
    return (
      <div className="panel-inner-container">
        {[...Array(9)].map((e, i) => (
          <Box
            key={i}
            value={this.props.boxes[i]}
            onClick={() => this.props.onClick(i)}
          />
        ))}
      </div>
    );
  }
}
