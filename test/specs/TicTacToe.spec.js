import TicTacToe from '../../src/TicTacToe';
import ai from '../../src/ai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { assert, expect } from 'chai';

'use strict';

describe('TicTacToe component', () => {

  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<TicTacToe width={ 4 }/>);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
  });

  it('should exist', () => {
    assert.ok(TicTacToe);
  });

  describe('when rendered successfully', () => {

    it('should have a board', () => {
      expect(component).to.have.ownProperty('board');
      assert.isArray(component.board.board);
    });

    it('should be player 1\'s turn', () => {
      expect(component.state.player).to.equal(1);
    });

    it('should not be frozen initially', () => {
      expect(component.state.freezeBoard).to.be.false;
    });

    it('should not have a winner initially', () => {
      expect(component.state.winner).to.be.false;
    });

    it('should contain a grid', () => {
      const grid = TestUtils.findRenderedDOMComponentWithClass(component, 'grid');
      assert.ok(grid);
    });

    it('should contain the correct board elements', () => {
      const rows = TestUtils.scryRenderedDOMComponentsWithClass(component, 'row');
      const cells = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell');
      expect(rows).to.have.length(4);
      expect(cells).to.have.length(16);
    });
  });

  describe('cells', () => {

    it('should store the correct coords on the data attribute', () => {
      const cell = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell')[0];
      expect(cell.dataset.cell).to.equal('0_0');
    });

    it('should respond to click events', () => {
      const cell = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell')[0];
      component.setState({player: 1});
      expect(component.board.getCell(0, 0)).to.equal(0);
      TestUtils.Simulate.click(cell);
      expect(component.board.getCell(0, 0)).to.equal(1);
      expect(cell.classList[0]).to.equal('cell-p1');
    });

    it('should not respond to click events if frozen', () => {
      component.setState({freezeBoard: true});
      const cell = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell')[0];
      component.setState({player: 1});
      expect(component.board.getCell(0, 0)).to.equal(0);
      TestUtils.Simulate.click(cell);
      expect(component.board.getCell(0, 0)).to.equal(0);
      expect(cell.classList[0]).to.equal('cell');
    });
  });

  describe('nextPlayer', () => {

    it('should return the next player', () => {
      component.setState({player: 1});
      expect(component.nextPlayer()).to.equal(2);
    });
  });

  describe('playerMove', () => {

    let mockEvent = {target: {dataset: {cell: '0_0'}}};

    it('should populate an empty cell on the board when passed a click event', () => {
      let { board } = component.board;
      component.setState({player: 1});
      component.playerMove(mockEvent);
      expect(board[0][0]).to.equal(1);
    });

    it('should do nothing if cell is not empty', () => {
      let { board } = component.board;
      component.setState({player: 1});
      board[0][0] = 2;
      component.playerMove(mockEvent);
      expect(board[0][0]).to.equal(2);
    });

    it('should switch player', () => {
      component.setState({player: 1});
      component.playerMove(mockEvent);
      expect(component.state.player).to.equal(2);
    });
  });

  describe('aiMove', () => {

    before(() => {
      ai.numTrials = 5;
    });

    after(() => {
      ai.numTrials = 1000;
    });

    it('should populate an empty cell on the board', () => {
      let { board } = component.board;
      component.setState({player: 1});
      component.aiMove();
      setTimeout(() => {
        let placed = board.reduce((a, b) => { return a.concat(b); }).some((el) => { return el === 1; });
        expect(placed).to.be.true;
      }, 300);
    });

    it('should switch player', () => {
      component.setState({player: 1});
      component.aiMove();
      setTimeout(() => {
        expect(component.state.player).to.equal(2);
      }, 300);
    });
  });

  describe('move', () => {

    it('should populate a cell on the board', () => {
      let { board } = component.board;
      component.move(0, 0, 1, () => {});
      expect(board[0][0]).to.equal(1);
    });

    it('should set winner and freeze the board if there is a winner', () => {
      component.board.board = [[1, 2, 1], [2, 1, 1], [0, 2, 2]];
      component.move(2, 0, 1, () => {});
      expect(component.state.winner).to.equal(1);
      expect(component.state.freezeBoard).to.be.true;
    });

    it('should call the callback if no winner', () => {
      let called = false;
      component.move(2, 0, 1, () => { called = true; });
      expect(called).to.be.true;
    });
  });
});
