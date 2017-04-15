'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var ai = {
  numTrials: 1000,

  // Play a game starting with the given player by making
  // random moves, alternating between players.
  trial: function trial(player) {
    var emptyCells = this.trialBoard.getEmptyCells();

    while (this.trialBoard.checkWin() === false) {
      var _emptyCells$Math$floor = _slicedToArray(emptyCells[Math.floor(Math.random() * emptyCells.length)], 2);

      var x = _emptyCells$Math$floor[0];
      var y = _emptyCells$Math$floor[1];

      this.trialBoard.move(x, y, player);
      emptyCells = this.trialBoard.getEmptyCells();
      player = player === 1 ? 2 : 1;
    }
  },

  // Score the completed board and update the scores grid.
  updateScores: function updateScores(player) {
    var _this = this;

    var winner = this.trialBoard.checkWin();
    var scorePlayer = 2;
    var scoreOther = 1;

    if (winner && winner < 3) {
      (function () {
        var other = player === 1 ? 2 : 1;

        _this.scores.forEach(function (row, rowInd) {
          row.forEach(function (cell, cellInd) {
            if (_this.trialBoard.getCell(rowInd, cellInd) === player) {
              if (player === winner) {
                _this.scores[rowInd][cellInd] += scorePlayer;
              } else {
                _this.scores[rowInd][cellInd] -= scorePlayer;
              }
            } else if (_this.trialBoard.getCell(rowInd, cellInd) === other) {
              if (player === winner) {
                _this.scores[rowInd][cellInd] -= scoreOther;
              } else {
                _this.scores[rowInd][cellInd] += scoreOther;
              }
            }
          });
        });
      })();
    }
  },

  // Find all empty cells with the maximum score
  // and randomly return one of them.
  getBestMove: function getBestMove(board) {
    var _this2 = this;

    var result = undefined;

    var highScores = board.getEmptyCells().map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var x = _ref2[0];
      var y = _ref2[1];

      return { cell: [x, y], score: _this2.scores[x][y] };
    }).sort(function (a, b) {
      return a.score < b.score;
    }).filter(function (cell, i, arr) {
      return cell.score === arr[0].score;
    });

    if (highScores.length === 1) {
      result = highScores[0].cell;
    } else {
      result = highScores[Math.floor(Math.random() * highScores.length)].cell;
    }

    return result;
  },

  // Return a copy of the current state of a given board.
  clone: function clone(original) {
    var clone = new _board2['default'](original.getDim());
    clone.board = original.board.map(function (row) {
      return row.slice();
    });
    return clone;
  },

  // Use a Monte Carlo simulation to return a move
  // for the AI player.
  move: function move(currentBoard, player) {
    this.scores = new _board2['default'](currentBoard.getDim()).board;

    for (var i = 0; i < this.numTrials; i++) {
      this.trialBoard = this.clone(currentBoard);
      this.trial(player);
      this.updateScores(player);
    }

    return this.getBestMove(currentBoard);
  }
};

exports['default'] = ai;
module.exports = exports['default'];