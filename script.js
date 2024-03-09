let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(cellIndex) {
  if (boardState[cellIndex] === '' && gameActive) {
    boardState[cellIndex] = currentPlayer;
    renderBoard();
    handleResultValidation();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function handleResultValidation() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      displayResult(`${currentPlayer} wins!`);
      return;
    }
  }

  if (!boardState.includes('')) {
    gameActive = false;
    displayResult("It's a tie!");
    return;
  }
}

function renderBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerText = boardState[i];
    cell.addEventListener('click', () => handleCellClick(i));
    board.appendChild(cell);
  }
}

function displayResult(message) {
  const status = document.getElementById('status');
  status.innerText = message;
}

function handleReset() {
  currentPlayer = 'X';
  gameActive = true;
  boardState = ['', '', '', '', '', '', '', '', ''];
  renderBoard();
  displayResult('');
}

document.getElementById('resetBtn').addEventListener('click', handleReset);

renderBoard();
