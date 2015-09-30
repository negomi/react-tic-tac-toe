import React from 'react';
import Board from './Board';

'use strict';

class TicTacToe extends React.Component {

  constructor(props) {
    super(props);
    this.board = new Board(props.width);
    this.state = {
      player: Math.floor(Math.random() * 2) + 1,
      freezeBoard: false
    };
  }

  aiMove() {
    this.setState({
      player: this.state.player === 1 ? 2 : 1,
      freezeBoard: true
    });
    // Trigger AI
    // this.board.move(x, y, this.state.player);
    this.setState({
      player: this.state.player === 1 ? 2 : 1,
      freezeBoard: false
    });
  }

  switchPlayer() {
    this.setState({player: this.state.player === 1 ? 2 : 1});
  }

  handleMove(event) {
    let [x, y] = event.target.dataset.cell.split('_');
    let cellEmpty = this.board.getCell(x, y) === 0;

    if (cellEmpty) {
      this.board.move(x, y, this.state.player);

      if (this.props.singlePlayer) {
        this.aiMove();
      } else {
        this.switchPlayer();
      }
    }
  }

  render() {
    let { board } = this.board;

    let grid = board.map((row, rowInd) => {
      let cells = row.map((cell, cellInd) => {
        let classString = cell > 0 ? cell === 1 ? 'cell-p1' : 'cell-p2' : 'cell';
        let coords = `${rowInd}_${cellInd}`;
        let clickHandler;

        if (!this.state.freezeBoard) { clickHandler = this.handleMove.bind(this); }

        return <div className={ classString } key={ cellInd } onClick={ clickHandler } data-cell={ coords }></div>;
      });

      return <div className="row" key={ rowInd }>{ cells }</div>;
    });

    return <div className="grid">{ grid }</div>;
  }
}

TicTacToe.propTypes = { width: React.PropTypes.number };
TicTacToe.defaultProps = { width: 3 };

export default TicTacToe;
