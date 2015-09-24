import React from 'react';

'use strict';

class TicTacToe extends React.Component {
  getRow(count) {
    let cells = [];
    for (var i = 0; i < this.props.xAxis; i++) {
      cells.push(<div className="cell" key={ `cell-${count}-${i}` }></div>);
    }
    return cells;
  }

  getGrid() {
    let rows = [];
    for (var i = 0; i < this.props.yAxis; i++) {
      rows.push(<div className="row" key={ `row-${i}` }>{ this.getRow(i) }</div>);
    }
    return rows;
  }

  render() {
    return <div className="grid">{ this.getGrid() }</div>;
  }
}

export default TicTacToe;
