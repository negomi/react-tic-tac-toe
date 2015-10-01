import Board from './Board';

let ai = {
  numTrials: 50,
  scoreCurrent: 2,
  scoreOther: 1,

  trial(player) {
    let emptyCells = this.testBoard.getEmptyCells();

    while (this.testBoard.checkWin() === false) {
      let [ x, y ] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.testBoard.move(x, y, player);
      emptyCells = this.testBoard.getEmptyCells();
      player = player === 1 ? 2 : 1;
    }
  },

  updateScores(player) {
    let winner = this.testBoard.checkWin();

    if (winner < 3) {
      let other = winner === 1 ? 2 : 1;

      if (player === winner) {
        this.scores.forEach((row, rowInd) => {
          row.forEach((cell, cellInd) => {
            if (this.testBoard.getCell(rowInd, cellInd) === player) {
              this.scores[rowInd][cellInd] += this.scoreCurrent;
            } else if (this.testBoard.getCell(rowInd, cellInd) === other) {
              this.scores[rowInd][cellInd] += -this.scoreOther;
            }
          });
        });
      } else {
        this.scores.forEach((row, rowInd) => {
          row.forEach((cell, cellInd) => {
            if (this.testBoard.getCell(rowInd, cellInd) === player) {
              this.scores[rowInd][cellInd] += -this.scoreCurrent;
            } else if (this.testBoard.getCell(rowInd, cellInd) === other) {
              this.scores[rowInd][cellInd] += this.scoreOther;
            }
          });
        });
      }
    }
  },

  getBestMove(board) {
    let emptyCells = board.getEmptyCells();

    let emptyCellScores = emptyCells.map(([ x, y ]) => {
      return {cell: [x, y], score: this.scores[x][y]};
    });

    console.log(emptyCellScores);
  },

  cloneBoard(original) {
    let clone = new Board(original.getDim());
    clone.board = original.board;
    return clone;
  },

  move(board, player) {
    this.scores = new Board(board.getDim()).board;

    for (var i = 0; i < this.numTrials; i++) {
      this.testBoard = this.cloneBoard(board);
      this.trial(player);
      this.updateScores(player);
    }

    // return this.getBestMove(board);
    return [ 0, 0 ];
  }
};

export default ai;
