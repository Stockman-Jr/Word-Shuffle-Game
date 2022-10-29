// DOM elements
const ruleBtn = document.getElementById('rule-btn');
const startBtn = document.getElementById('start-btn');
const lvlBtns = document.getElementsByClassName("lvl-btn");
const guessBtn = document.getElementById('guess-btn');
const quitBtn = document.getElementById('quit-btn');
const nextLvlBtn = document.getElementById('next-level');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score');
const wordBox = document.getElementById('word-box');
const gameModeArea = document.getElementById('game-mode');
const gameMsg = document.getElementById('message-box');
const currentWord = document.getElementById('shuffled-word');
const category = document.getElementById('category');
const lives = document.getElementById('lives');

// Global Variables
let gameMode = "";
let score = 0;
let livesRemaining = 5;
let chosenWord = "";
let shuffledWord = "";
let highscore = localStorage.getItem("highscore");

// Word Arrays
const easyWords = ['witch', 'zombie', 'skull', 'candy', 'ghost', 'fear', 'evil',
  'moon', 'tomb', 'grim', 'blood', 'grave', 'spook', 'trick', 'treat', 'broom',
  'bone', 'horns', 'demon', 'coven'
];

const medWords = ['monkey', 'walrus', 'bobcat', 'jaguar', 'badger', 'hamster', 'weasel',
  'beaver', 'donkey', 'raccoon', 'giraffe', 'buffalo', 'leopard', 'gorilla', 'dolphin',
  'rabbit', 'penguin', 'jackal', 'cougar', 'ostrich'
];

const hardWords = ['scarface', 'deadpool', 'superbad', 'hercules', 'godzilla', 'pinocchio',
  'gladiator', 'zoolander', 'halloween', 'inception', 'wolverine', 'whiplash', 'footloose',
  'megamind', 'bewitched', 'braveheart', 'zombieland', 'cinderella', 'armageddon', 'goodfellas'
];


/**
 * Function for modal popup to display the rules
 */
ruleBtn.addEventListener('click', function () {
  let modal = document.getElementById('rules-modal');
  modal.classList.remove('hidden');
  let closeModal = document.getElementById('close');
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  })
})

//Wait for the DOM to finish loading before starting the game
//Get the button elements and add event listeners
document.addEventListener("DOMContentLoaded", function () {

  document.getElementById('high-score').innerHTML = localStorage.getItem("highscore");

  startBtn.addEventListener("click", () => {
    chooseDifficulty();
  })

})

function chooseDifficulty() {
  ruleBtn.classList.add('hidden');
  startBtn.classList.add('hidden');
  gameModeArea.classList.remove('hidden');

  for (let lvlBtn of lvlBtns) {
    lvlBtn.addEventListener("click", function () {
      let difficulty = this.getAttribute("data-type");
      if (difficulty === "easy") {
        gameMode = "easy";
      } else if (difficulty === "medium") {
        gameMode = "medium";
      } else if (difficulty === "hard") {
        gameMode = "hard";
      }
      startGame(gameMode);
    })

  }

}

/**
 * Function to get random word from array
 */

function getRandomWord(array) {
  let randomWord = array[Math.floor(Math.random() * array.length)];

  return randomWord;
}

/**
 * Function to shuffle letters in the random word
 */

function shuffleWord(word) {
  let letters = word.split('');

  for (let i = letters.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
}

/**
 * Check if words has been used and removes them from array to avoid repetition
 * If array contains 5 items, win the game/level
 */

function winCondition(array) {
  var usedWord = chosenWord;
  var index = array.indexOf(usedWord);
  if (index != -1) {
    array.splice(index, 1);
  }
  if (array.length === 12) {
    winGame();
  } else {
    setTimeout(function () {
      startGame(gameMode);
    }, 1000);
  }

}

/**
 * Check for users chosen difficulty
 * Starts game based choice
 */

function startGame(gameMode) {
  guessBtn.classList.remove('hidden');
  userInput.classList.remove('hidden');
  wordBox.classList.remove('hidden');
  category.classList.remove('hidden');
  quitBtn.classList.remove('hidden');

  gameModeArea.classList.add('hidden');
  ruleBtn.classList.add('hidden');
  nextLvlBtn.classList.add('hidden');
  gameMsg.classList.add('hidden');

  document.getElementById('heading').innerHTML = "Guess the word!";

  checkScore();
  userInput.value = "";
  userInput.focus();

  if (gameMode === "easy") {
    chosenWord = getRandomWord(easyWords);
    shuffledWord = shuffleWord(chosenWord);
    wordBox.innerHTML = shuffledWord;
    category.innerHTML = "Category: Halloween";
  } else if (gameMode === "medium") {
    chosenWord = getRandomWord(medWords);
    shuffledWord = shuffleWord(chosenWord);
    wordBox.innerHTML = shuffledWord;
    category.innerHTML = "Category: Animals";
  } else if (gameMode === "hard") {
    chosenWord = getRandomWord(hardWords);
    shuffledWord = shuffleWord(chosenWord);
    wordBox.innerHTML = shuffledWord;
    category.innerHTML = "Category: Movie Titles";
    nextLvlBtn.style.display = "none";
  }
}

/**
 * Compares users input to the chosen word
 * Adds to score if correct, removes life if incorrect
 */

function checkAnswer() {
  let letterCheck = /^[A-Za-z]+$/;
  if (userInput.value.toLowerCase() === chosenWord) {
    wordBox.innerHTML = "Correct!"
    score++;
    scoreDisplay.innerHTML = score;
    if (gameMode === "easy") {
      winCondition(easyWords);
    } else if (gameMode === "medium") {
      winCondition(medWords);
    } else if (gameMode === "hard") {
      winCondition(hardWords);
    }
  } else if (userInput.value !== chosenWord && userInput.value.match(letterCheck)) {
    livesRemaining--;
    lives.innerHTML = livesRemaining;
    wordBox.innerHTML = `Bzzzt, not quite. ${livesRemaining} lives remaining!`;
    checkRemainingLives();
  } else {
    alert('Oops, please input letters only!')
    userInput.value = "";
    userInput.focus();
  }
}

/**
 * Checks if remaining lives are 0
 * Initiates game over function if true
 */

function checkRemainingLives() {
  if (livesRemaining === 0) {
    gameOver();
  } else {
    setTimeout(function () {
      wordBox.innerHTML = shuffledWord;
    }, 1000);
  }
}

/**
 * Checks for new high score and adds to local storage
 */

function checkScore() {
  if (!localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", score);
  }
  if (score <= highscore) {
    return;
  } else if (score > highscore) {
    document.getElementById('high-score').innerHTML = score;
    localStorage.setItem("highscore", score);
  }
}

/**
 * Displays a game over message for the user
 * Checks score, highscore
 * Play again button restarts game
 */

function gameOver() {
  guessBtn.classList.add('hidden');
  userInput.classList.add('hidden');
  category.classList.add('hidden');
  gameMsg.classList.remove('hidden');
  quitBtn.classList.add('hidden');

  document.getElementById('heading').innerHTML = "Game Over";

  checkScore();
  document.getElementById('high-score').innerHTML = score;

  if (score <= parseInt(highscore) || highscore === null) {
    document.getElementById('message').innerHTML = `The word was ${chosenWord}. <br/> 
    You scored ${score} points!`;
  } else if (score > parseInt(highscore)) {
    document.getElementById('message').innerHTML = `The word was ${chosenWord}. <br/> 
    New high-score!`;
  }

  wordBox.innerHTML = chosenWord;

  let playAgain = document.getElementById('play-again');
  playAgain.classList.remove('hidden');

  playAgain.addEventListener('click', () => {
    document.location.reload()
  })
}

/**
 * Displays a win message for the user
 * Checks score, highscore
 * Next level button takes you to next level unless you're in hard mode
 */

function winGame() {
  guessBtn.classList.add('hidden');
  userInput.classList.add('hidden');
  category.classList.add('hidden');
  gameMsg.classList.remove('hidden');
  nextLvlBtn.classList.remove('hidden');

  checkScore();
  document.getElementById('high-score').innerHTML = score;

  document.getElementById('heading').innerHTML = "You won!";

  if (score <= parseInt(highscore) || highscore === null) {
    document.getElementById('message').innerHTML = `Good job! You completed the ${gameMode} level! <br/> 
    You scored ${score} points!`;
  } else if (score > parseInt(highscore)) {
    document.getElementById('message').innerHTML = `Good job! You completed the ${gameMode} level! <br/> 
    New high-score!`;
  }

  nextLvlBtn.addEventListener('click', () => {
    if (gameMode === "easy") {
      gameMode = "medium";
      startGame(gameMode);
    } else if (gameMode === "medium") {
      gameMode = "hard";
      startGame(gameMode);
    }
  })
}

//Event listeners for guess button, both mouseclick and keydown
userInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    guessBtn.click(checkAnswer);
  }
})
guessBtn.addEventListener('click', () => {
  checkAnswer();
})

//Event listener for quit button, resets localstorage on hard mode
quitBtn.addEventListener('click', () => {
  document.location.reload();
  if (gameMode === "hard") {
    localStorage.clear();
  }
})