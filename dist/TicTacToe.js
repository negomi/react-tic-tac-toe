(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["TicTacToe"] = factory(require("react"));
	else
		root["TicTacToe"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _board = __webpack_require__(2);

	var _board2 = _interopRequireDefault(_board);

	var _ai = __webpack_require__(3);

	var _ai2 = _interopRequireDefault(_ai);

	'use strict';

	var TicTacToe = (function (_React$Component) {
	  _inherits(TicTacToe, _React$Component);

	  function TicTacToe(props) {
	    _classCallCheck(this, TicTacToe);

	    _get(Object.getPrototypeOf(TicTacToe.prototype), 'constructor', this).call(this, props);
	    this.board = new _board2['default'](props.width);
	    this.state = { player: 1, freezeBoard: false, winner: false };
	  }

	  _createClass(TicTacToe, [{
	    key: 'nextPlayer',
	    value: function nextPlayer() {
	      return this.state.player === 1 ? 2 : 1;
	    }

	    // Place a move on the board and check for a winner.
	  }, {
	    key: 'move',
	    value: function move(x, y, player, callback) {
	      this.board.move(x, y, player);
	      var winner = this.board.checkWin();

	      if (winner) {
	        this.setState({ winner: winner, freezeBoard: true });
	      } else {
	        callback();
	      }
	    }

	    // Handle a player's move, and switch to the next player.
	  }, {
	    key: 'playerMove',
	    value: function playerMove(event) {
	      var _this = this;

	      var _event$target$dataset$cell$split = event.target.dataset.cell.split('_');

	      var _event$target$dataset$cell$split2 = _slicedToArray(_event$target$dataset$cell$split, 2);

	      var x = _event$target$dataset$cell$split2[0];
	      var y = _event$target$dataset$cell$split2[1];

	      var cellEmpty = this.board.getCell(x, y) === 0;

	      if (cellEmpty) {
	        this.move(x, y, this.state.player, function () {
	          if (_this.props.singlePlayer) {
	            _this.setState({ player: _this.nextPlayer(), freezeBoard: true }, _this.aiMove);
	          } else {
	            _this.setState({ player: _this.nextPlayer() });
	          }
	        });
	      }
	    }

	    // Make an AI move, with a small delay for a more natural response time.
	  }, {
	    key: 'aiMove',
	    value: function aiMove() {
	      var _this2 = this;

	      var _ai$move = _ai2['default'].move(this.board, this.state.player);

	      var _ai$move2 = _slicedToArray(_ai$move, 2);

	      var x = _ai$move2[0];
	      var y = _ai$move2[1];

	      setTimeout(function () {
	        _this2.move(x, y, _this2.state.player, function () {
	          _this2.setState({ player: _this2.nextPlayer(), freezeBoard: false });
	        });
	      }, 200);
	    }

	    // Determine which player will be the AI in single player mode,
	    // and make the first move if appropriate.
	  }, {
	    key: 'aiInit',
	    value: function aiInit() {
	      if (this.props.singlePlayer) {
	        var aiPlayer = Math.floor(Math.random() * 2) + 1;
	        if (aiPlayer === 1) {
	          this.aiMove();
	        }
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.board = new _board2['default'](this.props.width);
	      this.setState({ player: 1, freezeBoard: false, winner: false });
	      this.aiInit();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.aiInit();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var board = this.board.board;

	      var announcement = undefined;

	      if (this.state.winner) {
	        var msg = this.state.winner > 2 ? 'It\'s a tie!' : 'Player ' + this.state.winner + ' wins!';
	        announcement = _react2['default'].createElement(
	          'div',
	          { className: 'announcement' },
	          _react2['default'].createElement(
	            'p',
	            null,
	            msg
	          ),
	          _react2['default'].createElement(
	            'button',
	            { onClick: this.reset.bind(this) },
	            'Reset'
	          )
	        );
	      }

	      var grid = board.map(function (row, rowInd) {
	        var cells = row.map(function (cell, cellInd) {
	          var classString = cell > 0 ? cell === 1 ? 'cell-p1' : 'cell-p2' : 'cell';
	          var coords = rowInd + '_' + cellInd;
	          var clickHandler = undefined;

	          if (!_this3.state.freezeBoard) {
	            clickHandler = _this3.playerMove.bind(_this3);
	          }

	          return _react2['default'].createElement('div', { className: classString, key: cellInd, onClick: clickHandler, 'data-cell': coords });
	        });

	        return _react2['default'].createElement(
	          'div',
	          { className: 'row', key: rowInd },
	          cells
	        );
	      });

	      return _react2['default'].createElement(
	        'div',
	        { className: 'grid' },
	        grid,
	        announcement
	      );
	    }
	  }]);

	  return TicTacToe;
	})(_react2['default'].Component);

	TicTacToe.propTypes = { width: _react2['default'].PropTypes.number };
	TicTacToe.defaultProps = { width: 3 };

	exports['default'] = TicTacToe;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _board = __webpack_require__(2);

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

/***/ })
/******/ ])
});
;