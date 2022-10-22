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