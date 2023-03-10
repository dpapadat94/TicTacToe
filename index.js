const spots = document.querySelectorAll(".spot");
const displayMessage = document.getElementById("displayMessage");

const gameBoard = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const restartButton = document.getElementById("restartButton");
let choice = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
let isrunning = false;
startGame();

function startGame() {
  spots.forEach(function (cell) {
    cell.addEventListener("click", spotselected);
  });
  restartButton.addEventListener("click", restartGame);
  displayMessage.textContent = `${currentPlayer} make your move`;
  isrunning = true;
}
function changePlayer() {
  currentPlayer = currentPlayer == "x" ? "o" : "x";
  displayMessage.textContent = `${currentPlayer} its your move`;
}

function spotselected() {
  const spaceIndex = this.getAttribute("spaceIndex");
  if (choice[spaceIndex] != "" || !isrunning) {
    return;
  }
  updateCell(this, spaceIndex);
  checkWinner();
}

function updateCell(cell, x) {
  choice[x] = currentPlayer;
  cell.textContent = currentPlayer;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < gameBoard.length; i++) {
    const condition = gameBoard[i];
    const cellA = choice[condition[0]];
    const cellB = choice[condition[1]];
    const cellC = choice[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    displayMessage.textContent = `${currentPlayer} Has won`;
    document.body.style.backgroundColor = "green";
    isrunning = false;
  } else if (!choice.includes("")) {
    displayMessage.textContent = "Its a Tie";
    document.body.style.backgroundColor = "blue";
    isrunning = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = "x";
  choice = ["", "", "", "", "", "", "", "", ""];
  displayMessage.textContent = currentPlayer + " its your turn";
  spots.forEach((cell) => (cell.textContent = ""));
  document.body.style.backgroundColor = "white";
  isrunning = true;
}
