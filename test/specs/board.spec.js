import Board from '../../src/board';
import { assert, expect } from 'chai';

'use strict';

describe('Board service', () => {

  it('should exist', () => {
    assert.ok(Board);
  });

  describe('when instantiated', () => {

    it('should create a new board of arbitrary size', () => {
      let expectedBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      const boardInstance = new Board(4);
      let { board } = boardInstance;
      expect(board).to.deep.equal(expectedBoard);
    });

    it('should throw if non-number is passed', () => {
      expect(Board.bind(null, 'foo')).to.throw();
    });

    it('should throw if number outside min or max bounds', () => {
      expect(Board.bind(null, 2)).to.throw();
      expect(Board.bind(null, 12)).to.throw();
    });
  });

  describe('getDim', () => {

    it('should return the board width', () => {
      const boardInstance = new Board(4);
      expect(boardInstance.getDim()).to.equal(4);
    });
  });

  describe('getCell', () => {

    it('should return the value of a given cell', () => {
      let boardInstance = new Board(3);
      boardInstance.board = [[1, 2, 0], [0, 1, 0], [0, 0, 2]];
      expect(boardInstance.getCell(1, 1)).to.equal(1);
      expect(boardInstance.getCell(2, 0)).to.equal(0);
    });
  });

  describe('move', () => {

    it('should place a player on the board', () => {
      let boardInstance = new Board(3);
      boardInstance.move(1, 1, 2);
      expect(boardInstance.board[1][1]).to.equal(2);
    });
  });

  describe('getEmptyCells', () => {

    it('should return the empty cells', () => {
      let boardInstance = new Board(3);
      boardInstance.board = [[1, 2, 0], [0, 1, 0], [0, 0, 2]];
      let expectedEmpty = [[0, 2], [1, 0], [1, 2], [2, 0], [2, 1]];
      expect(boardInstance.getEmptyCells()).to.deep.equal(expectedEmpty);
    });
  });

  describe('checkWin', () => {

    it('should return winning player, 3 if tie or false if no winner', () => {
      let boardInstance = new Board(3);
      boardInstance.board = [[1, 2, 0], [0, 1, 0], [0, 0, 2]];
      expect(boardInstance.checkWin()).to.equal(false);
      boardInstance.board = [[2, 2, 2], [1, 1, 0], [0, 0, 1]];
      expect(boardInstance.checkWin()).to.equal(2);
      boardInstance.board = [[0, 0, 1], [2, 2, 1], [0, 0, 1]];
      expect(boardInstance.checkWin()).to.equal(1);
      boardInstance.board = [[1, 2, 0], [0, 1, 0], [0, 0, 1]];
      expect(boardInstance.checkWin()).to.equal(1);
      boardInstance.board = [[0, 2, 1], [0, 1, 0], [1, 0, 0]];
      expect(boardInstance.checkWin()).to.equal(1);
      boardInstance.board = [[1, 2, 1], [2, 1, 2], [2, 1, 2]];
      expect(boardInstance.checkWin()).to.equal(3);
    });
  });

  describe('allEqual', () => {

    it('should check if all array elements are equal', () => {
      expect(Board.allEqual([3, 3, 3, 3])).to.be.true;
      expect(Board.allEqual([4, 3, 4])).to.be.false;
    });
  });
});
