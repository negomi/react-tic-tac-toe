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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _ai = require('./ai');

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