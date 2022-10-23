// DOM elements
const lvlBtns = document.getElementsByClassName("lvl-btn");
const guessBtn = document.getElementById('guess-btn');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score');
const wordBox = document.getElementById('word-box');
const gameModeArea = document.getElementById('game-mode');
const gameOverMsg = document.getElementById('game-over');
const currentWord = document.getElementById('shuffled-word');
const category = document.getElementById('category');
const lives = document.getElementById('lives');

// Global Variables
let gameMode = "";
let score = 0;
let livesRemaining = 5;
let chosenWord = "";
let shuffledWord= "";

// Word Arrays
const easyWords = ['witch', 'zombie', 'skull', 'candy', 'ghost', 'fear', 'evil', 'moon', 'tomb', 'grim', 'blood', 'grave', 'spook', 'trick', 'treat'];
const medWords = ['monkey', 'walrus', 'bobcat', 'jaguar', 'badger', 'hamster', 'weasel', 'beaver', 'donkey', 'raccoon', 'giraffe', 'buffalo', 'leopard', 'gorilla', 'dolphin'];
const hardWords = ['scarface', 'deadpool', 'superbad', 'hercules', 'godzilla', 'pinocchio', 'gladiator', 'zoolander', 'halloween', 'inception'];


//Wait for the DOM to finish loading before starting the game
//Get the button elements and add event listeners
document.addEventListener("DOMContentLoaded", function() {

  for (let lvlBtn of lvlBtns) {
  
    lvlBtn.addEventListener("click", function() {
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
  
})

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
 * Check for users chosen difficulty
 * Starts game based choice
 */

function startGame(gameMode) {
  guessBtn.classList.remove('hidden');
  userInput.classList.remove('hidden');
  wordBox.classList.remove('hidden');
  gameModeArea.classList.add('hidden');

  userInput.value = "";
  userInput.focus();

  if (gameMode === "easy") {
    chosenWord = getRandomWord(easyWords);
    shuffledWord = shuffleWord(chosenWord);
    wordBox.innerHTML = shuffledWord;
    category.innerHTML = "Category: Halloween";
    console.log(chosenWord, shuffledWord);
  } else if ( gameMode === "medium") {
    chosenWord = getRandomWord(medWords);
    shuffledWord = shuffleWord(chosenWord);
    wordBox.innerHTML = shuffledWord;
    category.innerHTML = "Category: Animals";
  } else if ( gameMode === "hard") {
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
  if (userInput.value === chosenWord) {
    score++;
    scoreDisplay.innerHTML = score;
    startGame(gameMode);
  } else if (userInput.value !== chosenWord) {
   livesRemaining--;
   lives.innerHTML = livesRemaining;
   checkRemainingLives();
  } 

}

/**
 * Checks if remaining lives are 0
 * Initiates game over function if true
 */

function checkRemainingLives() {
  if (livesRemaining === 0) {
    gameOver();
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
  gameOverMsg.classList.remove('hidden');
  
  document.getElementById('heading').innerHTML = "Game Over";

  document.getElementById('message').innerHTML = `The word was ${chosenWord}. <br/> 
  You scored ${score} points!`;

  wordBox.innerHTML = chosenWord;

  let playAgain = document.getElementById('play-again');
  playAgain.addEventListener('click', () => {
    document.location.reload()
  })

}

guessBtn.addEventListener('click', checkAnswer);