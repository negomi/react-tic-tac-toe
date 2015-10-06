'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Board = (function () {
  function Board(width) {
    _classCallCheck(this, Board);

    if (typeof width !== 'number') {
      throw new Error('Width must be a number');
    }

    if (width < 3 || width > 10) {
      throw new Error('Width cannot be less than 3 or greater than 10');
    }

    this.board = [];

    for (var i = 0; i < width; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(0);
      }
      this.board.push(row);
    }
  }

  // Return the board width.

  _createClass(Board, [{
    key: 'getDim',
    value: function getDim() {
      return this.board.length;
    }

    // Return the value of a given cell.
  }, {
    key: 'getCell',
    value: function getCell(x, y) {
      return this.board[x][y];
    }

    // Assign a cell on the board to a given player.
  }, {
    key: 'move',
    value: function move(x, y, player) {
      this.board[x][y] = player;
    }

    // Return the coordinates of all empty cells.
  }, {
    key: 'getEmptyCells',
    value: function getEmptyCells() {
      return this.board.map(function (row, rowInd) {
        return row.map(function (cell, cellInd) {
          if (cell === 0) {
            return [rowInd, cellInd];
          }
        });
      }).reduce(function (a, b) {
        return a.concat(b);
      }).filter(function (cell) {
        return typeof cell !== 'undefined';
      });
    }

    // Check if all values in an array are equal.
  }, {
    key: 'checkWin',

    // Check if the game has been won.
    // Returns player number, 3 in the case of a tie, or false if no winner.
    value: function checkWin() {
      var winner = false;
      var boardWidth = this.getDim();

      // Check rows.
      for (var rowInd = 0; rowInd < boardWidth; rowInd++) {
        var row = this.board[rowInd];
        if (Board.allEqual(row) && row[0] > 0) {
          winner = row[0];
          return winner;
        }
      }

      // Check columns.
      for (var rowInd = 0; rowInd < boardWidth; rowInd++) {
        var col = [];
        for (var colInd = 0; colInd < boardWidth; colInd++) {
          col.push(this.getCell(colInd, rowInd));
        }
        if (Board.allEqual(col) && col[0] > 0) {
          winner = col[0];
          return winner;
        }
      }

      // Check diagonals.
      var diags = { left: [], right: [] };
      for (var i = 0; i < boardWidth; i++) {
        diags.left.push(this.getCell(i, i));
        diags.right.push(this.getCell(boardWidth - i - 1, i));
      }

      for (var key in diags) {
        var diag = diags[key];
        if (Board.allEqual(diag) && diag[0] > 0) {
          winner = diag[0];
          return winner;
        }
      }

      // Check tie.
      var tie = !this.board.reduce(function (a, b) {
        return a.concat(b);
      }).some(function (cell) {
        return cell === 0;
      });
      if (tie) winner = 3;

      return winner;
    }
  }], [{
    key: 'allEqual',
    value: function allEqual(arr) {
      return !arr.some(function (val, i, arr) {
        return val !== arr[0];
      });
    }
  }]);

  return Board;
})();

exports['default'] = Board;
module.exports = exports['default'];