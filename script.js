// List of possible game choices
const choices = ["rock", "paper", "scissors"];

// Track game scores
let wins = 0, losses = 0, ties = 0;

// ====== DOM ELEMENT REFERENCES ======
// Select all player choice figures
const playerFigures = document.querySelectorAll("#player figure");
// Select the computer image placeholder
const computerImg = document.getElementById("computer-img");
// Select the result text area
const resultText = document.getElementById("result-text");

// Select scoreboard spans
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");
const tiesDisplay = document.getElementById("ties");

// Select the reset button
const resetBtn = document.getElementById("reset");

// ====== PLAYER CHOICE HANDLING ======
// Add click event to each figure (rock, paper, scissors)
playerFigures.forEach(fig => {
  fig.addEventListener("click", () => {
    // Remove "selected" style from all choices
    playerFigures.forEach(f => f.classList.remove("selected"));
    // Add "selected" style to the clicked choice
    fig.classList.add("selected");

    // Store the player's chosen move using data-choice
    const playerChoice = fig.dataset.choice;
    // Start the game with the chosen move
    playGame(playerChoice);
  });
});

// ====== MAIN GAME FUNCTION ======
function playGame(playerChoice) {
  // Update result text while computer is "thinking"
  resultText.textContent = "Computer is thinking...";

  // Shuffle computer images every 0.5 seconds
  const shuffleInterval = setInterval(() => {
    const randomChoice = choices[Math.floor(Math.random() * 3)];
    computerImg.src = `images/${randomChoice}.png`; // temporarily show random images
  }, 500);

  // After 3 seconds, stop shuffling and pick final choice
  setTimeout(() => {
    clearInterval(shuffleInterval);

    // Computer makes its real random choice
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    computerImg.src = `images/${computerChoice}.png`;

    // Decide winner based on player vs computer
    decideWinner(playerChoice, computerChoice);
  }, 3000);
}

// ====== WINNER LOGIC ======
function decideWinner(player, computer) {
  if (player === computer) {
    // Tie case
    resultText.textContent = "It's a Tie!";
    ties++;
    tiesDisplay.textContent = ties;
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    // Player wins case
    resultText.textContent = "You Win!";
    wins++;
    winsDisplay.textContent = wins;
  } else {
    // Computer wins case
    resultText.textContent = "Computer Wins!";
    losses++;
    lossesDisplay.textContent = losses;
  }
}

// ====== RESET BUTTON ======
resetBtn.addEventListener("click", () => {
  // Reset counters to zero
  wins = losses = ties = 0;
  winsDisplay.textContent = "0";
  lossesDisplay.textContent = "0";
  tiesDisplay.textContent = "0";

  // Reset result text
  resultText.textContent = "Make your move!";

  // Reset computer image to default question mark
  computerImg.src = "images/question-mark.png";

  // Clear any highlighted player choice
  playerFigures.forEach(f => f.classList.remove("selected"));
});
