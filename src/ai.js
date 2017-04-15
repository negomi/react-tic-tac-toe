import Board from './board';

let ai = {
  numTrials: 1000,

  // Play a game starting with the given player by making
  // random moves, alternating between players.
  trial(player) {
    let emptyCells = this.trialBoard.getEmptyCells();

    while (this.trialBoard.checkWin() === false) {
      let [ x, y ] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.trialBoard.move(x, y, player);
      emptyCells = this.trialBoard.getEmptyCells();
      player = player === 1 ? 2 : 1;
    }
  },

  // Score the completed board and update the scores grid.
  updateScores(player) {
    const winner = this.trialBoard.checkWin();
    const scorePlayer = 2;
    const scoreOther = 1;

    if (winner && winner < 3) {
      const other = player === 1 ? 2 : 1;

      this.scores.forEach((row, rowInd) => {
        row.forEach((cell, cellInd) => {
          if (this.trialBoard.getCell(rowInd, cellInd) === player) {
            if (player === winner) {
              this.scores[rowInd][cellInd] += scorePlayer;
            } else {
              this.scores[rowInd][cellInd] -= scorePlayer;
            }
          } else if (this.trialBoard.getCell(rowInd, cellInd) === other) {
            if (player === winner) {
              this.scores[rowInd][cellInd] -= scoreOther;
            } else {
              this.scores[rowInd][cellInd] += scoreOther;
            }
          }
        });
      });
    }
  },

  // Find all empty cells with the maximum score
  // and randomly return one of them.
  getBestMove(board) {
    let result;

    const highScores = board.getEmptyCells().map(([ x, y ]) => {
      return {cell: [x, y], score: this.scores[x][y]};
    }).sort((a, b) => {
      return a.score < b.score;
    }).filter((cell, i, arr) => {
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
  clone(original) {
    let clone = new Board(original.getDim());
    clone.board = original.board.map((row) => { return row.slice(); });
    return clone;
  },

  // Use a Monte Carlo simulation to return a move
  // for the AI player.
  move(currentBoard, player) {
    this.scores = new Board(currentBoard.getDim()).board;

    for (var i = 0; i < this.numTrials; i++) {
      this.trialBoard = this.clone(currentBoard);
      this.trial(player);
      this.updateScores(player);
    }

    return this.getBestMove(currentBoard);
  }
};

export default ai;
