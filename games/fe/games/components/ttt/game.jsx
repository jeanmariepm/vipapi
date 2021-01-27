class Game {
  squares = Array(9).fill(null);

  getWinner() {
    return this.calculateWinner(this.squares);
  }

  isOver() {
    if (this.squares.filter((s) => s === null).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] !== null &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  };

  setAction(player, action) {
    this.squares[action] = player;
  }

  getAIAction() {
    // return center or top-left in first AI move
    if (this.squares.filter((s) => s === "X").length === 1) {
      if (!this.squares[4]) {
        return 4;
      } else if (!this.squares[0]) {
        return 0;
      }
    }
    // use minmax algorithm
    // find action with least value by choosing opp's action with highest value

    let [, action] = this.minmax(this.squares, "O");
    if (action === -1) {
      action = this.squares.findIndex((s) => s === null);
    }
    return action;
  }

  minmax = (squares, player, depth = 0) => {
    console.log(`minmax exploring ${squares} ${player}`);
    let next_val = 0;
    let action = -1;
    const best_val = player === "X" ? 1 : -1;
    const next_player = player === "X" ? "O" : "X";

    // pick a winning/loss-avoiding move if one exist
    [player, next_player].forEach((cplayer) => {
      squares.forEach((element, index) => {
        if (element === null && next_val === 0) {
          squares[index] = cplayer;
          if (this.calculateWinner(squares) === cplayer) {
            next_val = cplayer === player ? best_val : -best_val;
            action = index;
          }
          squares[index] = null;
        }
      });
    });
    // pick the best remaining
    if (next_val === 0 && depth < 8) {
      let [cnext_val, caction] = [next_val, action];
      squares.forEach((element, index) => {
        if (!element) {
          squares[index] = player;
          [next_val, action] = this.minmax(
            squares,
            (player = player === "X" ? "O" : "X"),
            (depth = depth + 1)
          );
          if (next_val === -best_val) {
            [cnext_val, caction] = [next_val, action];
          } else if (next_val === 0) {
            [cnext_val, caction] = [next_val, action];
          }
          squares[index] = null;
        }
      });
      [next_val, action] = [cnext_val, caction];
    }
    console.log(`minmax returning ${next_val} ${action}`);
    return [next_val, action];
  };
}

export default Game;
