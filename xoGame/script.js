document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const statusDisplay = document.getElementById("status");
  const resetButton = document.getElementById("reset-btn");
  const newGameButton = document.getElementById("new-game-btn");
  const scoreX = document.getElementById("score-x");
  const scoreO = document.getElementById("score-o");

  let gameActive = true;
  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let scores = {
    X: 0,
    O: 0,
  };

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const messages = {
    playerTurn: () => `Player ${currentPlayer}'s turn`,
    gameWon: () => `Player ${currentPlayer} wins!`,
    gameDraw: () => `Game ended in a draw!`,
  };

  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
  }

  function checkResult() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];

      if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
        continue;
      }

      if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
        roundWon = true;
        winningCells = [a, b, c];
        break;
      }
    }

    if (roundWon) {
      highlightWinningCells(winningCells);
      statusDisplay.textContent = messages.gameWon();
      gameActive = false;
      updateScore();
      return;
    }

    if (!gameState.includes("")) {
      statusDisplay.textContent = messages.gameDraw();
      gameActive = false;
      return;
    }

    changePlayer();
  }

  function highlightWinningCells(cells) {
    cells.forEach((index) => {
      document
        .querySelector(`.cell[data-index="${index}"]`)
        .classList.add("winning-cell");
    });
  }

  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = messages.playerTurn();
  }

  function updateScore() {
    scores[currentPlayer]++;

    if (currentPlayer === "X") {
      scoreX.textContent = scores.X;
    } else {
      scoreO.textContent = scores.O;
    }
  }

  function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = messages.playerTurn();

    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o", "winning-cell");
    });
  }

  function newGame() {
    resetGame();
    scores = { X: 0, O: 0 };
    scoreX.textContent = "0";
    scoreO.textContent = "0";
  }

  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  resetButton.addEventListener("click", resetGame);
  newGameButton.addEventListener("click", newGame);

  statusDisplay.textContent = messages.playerTurn();
});
