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
 'moon', 'tomb', 'grim', 'blood', 'grave', 'spook', 'trick', 'treat'];
const medWords = ['monkey', 'walrus', 'bobcat', 'jaguar', 'badger', 'hamster', 'weasel', 
'beaver', 'donkey', 'raccoon', 'giraffe', 'buffalo', 'leopard', 'gorilla', 'dolphin'];
const hardWords = ['scarface', 'deadpool', 'superbad', 'hercules', 'godzilla', 'pinocchio',
 'gladiator', 'zoolander', 'halloween', 'inception', 'wolverine', 'whiplash', 'precious', 'footloose', 'megamind', 'bewitched'];


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
        console.log(`you chose ${gameMode}`);
      } else if (difficulty === "medium") {
        gameMode = "medium";
        console.log(`you chose ${gameMode}`);
      } else if (difficulty === "hard") {
        gameMode = "hard";
        console.log(`you chose ${gameMode}`);
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
  console.log(index);
  if (index != -1) {
    array.splice(index, 1);
    console.log(array);
  } if (array.length === 12) {
    console.log(score);
    winGame();
  } else {
    setTimeout(function(){ startGame(gameMode);}, 1000);
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
  gameModeArea.classList.add('hidden');
  ruleBtn.classList.add('hidden');
  nextLvlBtn.classList.add('hidden');
  quitBtn.classList.remove('hidden');
  gameMsg.classList.add('hidden'); 

  document.getElementById('heading').innerHTML = "Guess the word!";

  userInput.value = "";
  userInput.focus();

  if (gameMode === "easy") {
    chosenWord = getRandomWord(easyWords);
    shuffledWord = shuffleWord(chosenWord);
    wordBox.innerHTML = shuffledWord;
    category.innerHTML = "Category: Halloween";
    console.log(chosenWord, shuffledWord);
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
    setTimeout(function(){wordBox.innerHTML = shuffledWord;}, 1000);
  }
}

/**
 * Checks for new high score and adds to local storage
 */

 function checkScore() {
  console.log(score);
  if (!localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", score);
  }

    if (score <= parseInt(highscore)) {
     return;
    } else if (score > parseInt(highscore)) {
      document.getElementById('high-score').innerHTML = score;
      localStorage.setItem("highscore", score);
      console.log(highscore);
    }
  } 

/**
 * Displays a game over message for the user
 * Play again button resets game
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
   } /*else if (score === 6) {
    document.getElementById('message').innerHTML = `Woohoo! You completed all the levels! <br/>
    You are hereby the new word shuffle champion! `;
   }*/
 
  nextLvlBtn.addEventListener('click', () => {
    if (gameMode === "easy") {
   gameMode = "medium";
   
  } else if (gameMode === "medium") {
    gameMode = "hard";
  }
  startGame(gameMode);
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

quitBtn.addEventListener('click', () => {
  document.location.reload();
})