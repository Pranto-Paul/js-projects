const guessForm = document.getElementById("guessForm");
const boxes = document.getElementById("boxes");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");
const guessInput = document.getElementById("guessInput");
//game Logic
let guessHistory = [];
let guessCount = 0;
let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);
let isGameOver = false;

function fillBoxes(guess) {
  const boxElements = Array.from(boxes.children);
  boxElements.forEach((box, index) => {
    box.innerText = guessHistory[index] || "";
  });
}

function resetGame() {
    guessHistory = [];
    guessCount = 0;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    isGameOver = false;
    fillBoxes("");
    message.textContent = "";
    guessInput.value = "";
}
if (!isGameOver) {
  guessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const guess = parseInt(event.target.guessInput.value);
    if (isNaN(guess)) {
      message.textContent = "🔴Please enter a valid number";
      return;
    } else if (guess < 1 || guess > 100) {
      message.textContent = "🔴Please enter a number between 1 and 100";
      return;
    } else {
      guessHistory.push(guess);
      guessCount++;

      event.target.guessInput.value = "";
      fillBoxes(guess);
      checkGuess(guess);
      if (guessCount === 5) {
        message.textContent = "🔴Game Over! The number was " + randomNumber;
        isGameOver = true;
        setTimeout(() => {
            resetGame();
        }, 2000);
      }
    }
  });
}
function checkGuess(guess) {
  if (guess === randomNumber) {
    message.textContent = "🟢Congratulations! You guessed the number!";
    isGameOver = true;
    setTimeout(() => {
      resetGame();
    }, 2000);
  } else if (guess < randomNumber) {
    message.textContent = "🔴Try a higher number";
  } else {
    message.textContent = "🔴Try a lower number";
  }
}

resetButton.addEventListener("click", () => {
  resetGame();
});
