/*DOM elements */
const ruleBtn = document.getElementById('rule-btn');
const lvlBtns = document.getElementsByClassName("lvl-btn");
const guessBtn = document.getElementById('guess-btn');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score');
const wordBox = document.getElementById('word-box');
const gameModeArea = document.getElementById('game-mode');
const currentWord = document.getElementById('shuffled-word');
const category = document.getElementById('category');
const lives = document.getElementById('lives');

/*Global Variables*/ 
let gameMode = "";
let score = 0;
let livesRemaining = 5;
let chosenWord = "";
let shuffledWord= "";

/*Word Arrays*/ 
const easyWords = ['witch', 'zombie', 'skull', 'candy', 'ghost', 'fear', 'evil', 'moon', 'tomb', 'grim', 'blood', 'grave', 'spook', 'trick', 'treat'];
const medWords = ['monkey', 'walrus', 'bobcat', 'jaguar', 'badger', 'hamster', 'weasel', 'beaver', 'donkey', 'raccoon', 'giraffe', 'buffalo', 'leopard', 'gorilla', 'dolphin'];
const hardWords = ['scarface', 'deadpool', 'superbad', 'hercules', 'godzilla', 'pinocchio', 'gladiator', 'zoolander', 'halloween', 'inception'];

function getRandomWord() {

}

function shuffleWord() {

}

function startGame() {

}

function checkAnswer() {

}

function checkRemainingLives() {

}