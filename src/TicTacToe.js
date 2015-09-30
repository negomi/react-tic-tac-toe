import React from 'react';
import Board from './Board';

'use strict';

class TicTacToe extends React.Component {

  constructor(props) {
    super(props);
    this.board = new Board(props.width);
    this.state = {player: 1, freezeBoard: false, winner: false};
  }

  nextPlayer() {
    return this.state.player === 1 ? 2 : 1;
  }

  move(x, y, player, callback) {
    this.board.move(x, y, player);

    let winner = this.board.checkWin();
    if (winner) {
      this.setState({winner: winner, freezeBoard: true});
    } else {
      callback();
    }
  }

  playerMove(event) {
    let [x, y] = event.target.dataset.cell.split('_');
    let cellEmpty = this.board.getCell(x, y) === 0;

    if (cellEmpty) {
      this.move(x, y, this.state.player, () => {
        if (this.props.singlePlayer) {
          this.setState({player: this.nextPlayer(), freezeBoard: true}, this.aiMove);
        } else {
          this.setState({player: this.nextPlayer()});
        }
      });
    }
  }

  aiMove() {
    // Trigger AI
    let x = Math.floor(Math.random() * 3);
    let y = Math.floor(Math.random() * 3);
    setTimeout(() => {
      this.move(x, y, this.state.player, () => {
        this.setState({player: this.nextPlayer(), freezeBoard: false});
      });
    }, 200);
  }

  aiInit() {
    if (this.props.singlePlayer) {
      let aiPlayer = Math.floor(Math.random() * 2) + 1;
      if (aiPlayer === 1) {
        this.aiMove();
      }
    }
  }

  reset() {
    this.board = new Board(this.props.width);
    this.setState({player: 1, freezeBoard: false, winner: false});
    this.aiInit();
  }

  componentDidMount() {
    this.aiInit();
  }

  render() {
    let { board } = this.board;
    let announcement;

    if (this.state.winner) {
      announcement = (
        <div className="announcement">
          <p>Player { this.state.winner } wins!</p>
          <button onClick={ this.reset.bind(this) }>Reset</button>
        </div>
      );
    }

    let grid = board.map((row, rowInd) => {
      let cells = row.map((cell, cellInd) => {
        let classString = cell > 0 ? cell === 1 ? 'cell-p1' : 'cell-p2' : 'cell';
        let coords = `${rowInd}_${cellInd}`;
        let clickHandler;

        if (!this.state.freezeBoard) { clickHandler = this.playerMove.bind(this); }

        return <div className={ classString } key={ cellInd } onClick={ clickHandler } data-cell={ coords }></div>;
      });

      return <div className="row" key={ rowInd }>{ cells }</div>;
    });

    return (
      <div className="grid">
        { grid }
        { announcement }
      </div>
    );
  }
}

TicTacToe.propTypes = { width: React.PropTypes.number };
TicTacToe.defaultProps = { width: 3 };

export default TicTacToe;
