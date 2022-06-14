'use strict';

class Board {
  constructor(width) {
    if (typeof width !== 'number') {
      throw new Error('Width must be a number');
    }

    if (width < 3 || width > 10) {
      throw new Error('Width cannot be less than 3 or greater than 10');
    }

    this.board = [];

    for (let i = 0; i < width; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push(0);
      }
      this.board.push(row);
    }
  }

  // Return the board width.
  getDim() {
    return this.board.length;
  }

  // Return the value of a given cell.
  getCell(x, y) {
    return this.board[x][y];
  }

  // Assign a cell on the board to a given player.
  move(x, y, player) {
    this.board[x][y] = player;
  }

  // Return the coordinates of all empty cells.
  getEmptyCells() {
    return this.board.map((row, rowInd) => {
      return row.map((cell, cellInd) => {
        if (cell === 0) {
          return [rowInd, cellInd];
        }
      });
    }).reduce((a, b) => {
      return a.concat(b);
    }).filter((cell) => {
      return typeof cell !== 'undefined';
    });
  }

  // Check if all values in an array are equal.
  static allEqual(arr) {
    return !arr.some((val, i, arr) => {
      return val !== arr[0];
    });
  }

  // Check if the game has been won.
  // Returns player number, 3 in the case of a tie, or false if no winner.
  checkWin() {
    let winner = false;
    const boardWidth = this.getDim();

    // Check rows.
    for (let rowInd = 0; rowInd < boardWidth; rowInd++) {
      let row = this.board[rowInd];
      if (Board.allEqual(row) && row[0] > 0) {
        winner = row[0];
        return winner;
      }
    }

    // Check columns.
    for (let rowInd = 0; rowInd < boardWidth; rowInd++) {
      let col = [];
      for (let colInd = 0; colInd < boardWidth; colInd++) {
        col.push(this.getCell(colInd, rowInd));
      }
      if (Board.allEqual(col) && col[0] > 0) {
        winner = col[0];
        return winner;
      }
    }

    // Check diagonals.
    let diags = { left: [], right: [] };
    for (let i = 0; i < boardWidth; i++) {
      diags.left.push(this.getCell(i, i));
      diags.right.push(this.getCell(boardWidth - i - 1, i));
    }

    for (let key in diags) {
      let diag = diags[key];
      if (Board.allEqual(diag) && diag[0] > 0) {
        winner = diag[0];
        return winner;
      }
    }

    // Check tie.
    let tie = !this.board.reduce((a, b) => {
      return a.concat(b);
    }).some((cell) => {
      return cell === 0;
    });
    if (tie) winner = 3;

    return winner;
  }
}

export default Board;
