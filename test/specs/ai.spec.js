import Board from '../../src/board';
import ai from '../../src/ai';
import { assert, expect } from 'chai';

'use strict';

describe('AI service', () => {

  it('should exist', () => {
    assert.ok(ai);
  });

  it('should have a default number of trials', () => {
    expect(ai.numTrials).to.equal(1000);
  });

  describe('trial', () => {

    it('should play a ramdomized game on the trial board', () => {
      ai.trialBoard = new Board(3);
      ai.trial(1);
      let played = ai.trialBoard.board.reduce((a, b) => { return a.concat(b); }).some((el) => { return el > 0; });
      assert.ok(played);
    });
  });

  describe('updateScores', () => {

    ai.trialBoard = new Board(3);
    let expectedScores;

    it('should populate the scoreboard correctly', () => {
      ai.scores = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      ai.trialBoard.board = [[0, 1, 2], [0, 2, 1], [2, 0, 0]];
      ai.updateScores(1);
      expectedScores = [[0, -2, 1], [0, 1, -2], [1, 0, 0]];
      expect(ai.scores).to.deep.equal(expectedScores);

      ai.scores = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      ai.trialBoard.board = [[0, 1, 1], [2, 2, 2], [0, 0, 0]];
      ai.updateScores(2);
      expectedScores = [[0, -1, -1], [2, 2, 2], [0, 0, 0]];
      expect(ai.scores).to.deep.equal(expectedScores);

      ai.scores = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      ai.trialBoard.board = [[1, 2, 1], [2, 1, 2], [2, 1, 2]];
      ai.updateScores(2);
      expectedScores = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      expect(ai.scores).to.deep.equal(expectedScores);
    });
  });

  describe('getBestMove', () => {

    it('should return a cell with the highest score', () => {
      let boardInstance = new Board(3);
      boardInstance.board = [[0, 0, 1], [2, 2, 0], [0, 0, 1]];
      ai.scores = [[20, 20, 20], [100, -13, 5], [13, 12, 4]];
      let move = ai.getBestMove(boardInstance);

      let allowed = [[0, 0], [0, 1]];
      let disallowed = [[0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
      let moveWithinAllowed = allowed.some((cell) => { return cell.toString() === move.toString(); });
      let moveWithinDisallowed = disallowed.some((cell) => { return cell.toString() === move.toString(); });

      assert.ok(moveWithinAllowed);
      assert.notOk(moveWithinDisallowed);
    });
  });

  describe('clone', () => {

    it('should return a copy of a board instance', () => {
      let boardInstance = new Board(3);
      boardInstance.board = [[0, 0, 1], [2, 2, 0], [0, 0, 1]];
      let clone = ai.clone(boardInstance);
      expect(clone).to.be.instanceof(Board);
      expect(clone.board).to.deep.equal([[0, 0, 1], [2, 2, 0], [0, 0, 1]]);
    });
  });

  describe('move', () => {

    let boardInstance;

    beforeEach(() => {
      ai.numTrials = 5;
      boardInstance = new Board(3);
      boardInstance.board = [[0, 0, 1], [2, 2, 0], [0, 0, 1]];
    });

    it('should create a scoreboard', () => {
      ai.move(boardInstance, 1);
      assert.ok(ai.scores);
    });

    it('should return a move for the AI player', () => {
      let move = ai.move(boardInstance, 1);

      let allowed = [[0, 0], [0, 1], [1, 2], [2, 0], [2, 1]];
      let disallowed = [[0, 2], [1, 0], [1, 1], [2, 2]];
      let moveWithinAllowed = allowed.some((cell) => { return cell.toString() === move.toString(); });
      let moveWithinDisallowed = disallowed.some((cell) => { return cell.toString() === move.toString(); });

      assert.ok(moveWithinAllowed);
      assert.notOk(moveWithinDisallowed);
    });
  });
});
