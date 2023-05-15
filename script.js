const Player = (name, mark) => {
  return {
    name,
    mark,
  }
};

const Gameboard = (() => {
  const moves = ['', '', '', '', '', '', '', '', ''];
  let currentRound = 9;

  function addMove(index, element) {
    return moves.splice(index, 1, element);
  }
  function decrementCurrentRound() {
    return currentRound--;
  }
  function getCurrentRound() {
    return currentRound;
  }
  function getWinner(player) {
    if ((moves[0] === 'X' && moves[1] === 'X' && moves[2] === 'X') ||
        (moves[0] === 'X' && moves[3] === 'X' && moves[6] === 'X') ||
        (moves[1] === 'X' && moves[4] === 'X' && moves[7] === 'X') ||
        (moves[2] === 'X' && moves[5] === 'X' && moves[8] === 'X') ||
        (moves[0] === 'X' && moves[4] === 'X' && moves[8] === 'X') ||
        (moves[3] === 'X' && moves[4] === 'X' && moves[5] === 'X') ||
        (moves[6] === 'X' && moves[7] === 'X' && moves[8] === 'X') ||
        (moves[2] === 'X' && moves[4] === 'X' && moves[6] === 'X')
    ) {
      console.log('X wins!')} 
    else if ((moves[0] === 'O' && moves[1] === 'O' && moves[2] === 'O') ||
             (moves[0] === 'O' && moves[3] === 'O' && moves[6] === 'O') ||
             (moves[1] === 'O' && moves[4] === 'O' && moves[7] === 'O') ||
             (moves[2] === 'O' && moves[5] === 'O' && moves[8] === 'O') ||
             (moves[0] === 'O' && moves[4] === 'O' && moves[8] === 'O') ||
             (moves[3] === 'O' && moves[4] === 'O' && moves[5] === 'O') ||
             (moves[6] === 'O' && moves[7] === 'O' && moves[8] === 'O') ||
             (moves[2] === 'O' && moves[4] === 'O' && moves[6] === 'O')
    ) {
      console.log('O wins!');
      } else {
      console.log('No winner yet - keep playing');
    }
  }
  function resetCurrentRound() {
    return currentRound = 9;
  }
  function resetMoves() {
    return moves.fill('', 0, 9);
  }

  return {
    moves, 
    addMove,
    decrementCurrentRound,
    getCurrentRound,
    getWinner,
    resetCurrentRound,
    resetMoves,
  }
})();

const DisplayController =(() => {
  const player1 = Player('Jared', 'X');
  const player2 = Player('Computer', 'O');
  const boardDisplay = document.querySelector('.board');

  function createBoardDisplay() {
    const moves = Gameboard.moves;
    moves.forEach((move, index) => {
      const button = document.createElement('button');
      button.className = 'square';
      button.id = index;
      button.textContent = move;
      boardDisplay.appendChild(button);
    })
  }

  function addMark() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
      square.addEventListener('click', () => {
        if (Gameboard.getCurrentRound() % 2 !== 0) {
          square.textContent = player1.mark;
          square.disabled = true;
          Gameboard.addMove(index, player1.mark);
          updateGameStatus(`${player1.name}'s turn! Round: ${Gameboard.getCurrentRound()}`);
          Gameboard.getWinner();
        } else {
          square.textContent = player2.mark;
          square.disabled = true;
          Gameboard.addMove(index, player2.mark);
          updateGameStatus(`${player2.name}'s turn! Round: ${Gameboard.getCurrentRound()}`);
          Gameboard.getWinner();
        }
        Gameboard.decrementCurrentRound();
      })
    })
  }

  function resetBoard() {
    const squares = document.querySelectorAll('.square');
    const status = document.querySelector('.status');
    const reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
      Gameboard.resetMoves();
      Gameboard.resetCurrentRound();
      status.textContent = "Let's Play Tic-Tac-Toe! You make the first move...";
      squares.forEach(square => {
        square.disabled = false;
        square.textContent = '';
      })
    })
  }

  function updateGameStatus(update) {
    const status = document.querySelector('.status');
    status.textContent = update;
  }

  return {
    createBoardDisplay,
    addMark,
    updateGameStatus,
    resetBoard
  }
})();

function game() {
  DisplayController.createBoardDisplay();
  DisplayController.addMark();
  DisplayController.resetBoard();
}

game();



