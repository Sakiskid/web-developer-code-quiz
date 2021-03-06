"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ANCHOR DOM Elements & Variables
var quizAreaEl = document.getElementById("quiz-area");
var gameOverEl = document.getElementById("game-over");
var answerButtonsWrapperEl = document.getElementById("buttons-answers");
var answerButtonsEl = document.getElementsByClassName("btn-answer");
var descriptionTextEl = document.getElementById("description-text");
var menuButtonsEl = document.getElementById("buttons-menu-wrapper");
var questionEl = document.getElementById("quiz-question");
var startButtonEl = document.getElementById("buttons-menu__start");
var timeRemainingEl = document.getElementById("time-remaining");
var newHighScoreEl = document.getElementById("new-high-score");
var highScoresEl = document.getElementById("high-scores");
var highScoreButtonEl = document.getElementById("high-score-input-btn");
var scoreEl = document.getElementById("score");
var highScoreObject = {
  Name: "N/A",
  Score: 0,
  Date: "N/A"
};
var highScores = [];
var debugMode = false; //NOTE make sure this is false before going live

var highScoreContenderMinRank = 5; // Fancy way of saying you need to be in top 3 to list on the high scores

var score = 0;
var totalScore = 0;
var questionWorth = 10;
var timePenalty = 5;
var allottedTimeAtStart = 90;
var timeLeft = 0;
var isGameOver = false; // ANCHOR Question Handling

var jsQuestions = [];
var htmlQuestions = [];
var cssQuestions = [];
var questionsNotYetAsked = [];
var currentListOfQuestions = [];
var currentQuestion = {};

function init() {
  addQuestionsToMainScript();
  initializeHighScores();
}

function addQuestionsToMainScript() {
  for (var i = 0; i < jsQuestionsToAdd.length; i++) {
    jsQuestions.push(jsQuestionsToAdd[i]);
  }

  for (var _i = 0; _i < htmlQuestionsToAdd.length; _i++) {
    htmlQuestions.push(htmlQuestionsToAdd[_i]);
  }

  for (var _i2 = 0; _i2 < cssQuestionsToAdd.length; _i2++) {
    cssQuestions.push(cssQuestionsToAdd[_i2]);
  }
}

function chooseWhichQuestionCategory(category) {
  if (category == "js" || category == "all") {
    currentListOfQuestions = currentListOfQuestions.concat(jsQuestions);
  }

  if (category == "html" || category == "all") {
    currentListOfQuestions = currentListOfQuestions.concat(htmlQuestions);
  }

  if (category == "css" || category == "all") {
    currentListOfQuestions = currentListOfQuestions.concat(cssQuestions);
  }

  for (var i = 0; i < currentListOfQuestions.length; i++) {
    questionsNotYetAsked.push(i);
  }

  reset();
}

function initializeHighScores() {
  var savedScores = localStorage.getItem("highScores");

  if (savedScores) {
    savedScores = JSON.parse(savedScores);
    highScores = [];

    for (var i = 0; i < savedScores.length; i++) {
      highScores.push(savedScores[i]);
    }
  } else {
    updateLocallySavedHighScores();
  }
}

function displayNextQuestion() {
  if (questionsNotYetAsked.length === 0) {
    gameOver();
    return;
  } // Choose a random question, then remove it from the available questions index


  var nextQuestionIndex = questionsNotYetAsked[random(questionsNotYetAsked.length)];
  currentQuestion = currentListOfQuestions[nextQuestionIndex];
  questionsNotYetAsked.splice(questionsNotYetAsked.indexOf(nextQuestionIndex), 1); // Display the question

  questionEl.textContent = currentQuestion.Question;
  descriptionTextEl.textContent = currentQuestion.Description;
  displayAnswers();
}

function displayAnswers() {
  var availableButtons = [0, 1, 2, 3];
  var answer = availableButtons[random(availableButtons.length)];
  availableButtons.splice(availableButtons.indexOf(answer), 1);
  var false1 = availableButtons[random(availableButtons.length)];
  availableButtons.splice(availableButtons.indexOf(false1), 1);
  var false2 = availableButtons[random(availableButtons.length)];
  availableButtons.splice(availableButtons.indexOf(false2), 1);
  var false3 = availableButtons[random(availableButtons.length)];
  availableButtons.splice(availableButtons.indexOf(false3), 1);
  answerButtonsEl[answer].textContent = currentQuestion.Answer;
  answerButtonsEl[false1].textContent = currentQuestion.False1;
  answerButtonsEl[false2].textContent = currentQuestion.False2;
  answerButtonsEl[false3].textContent = currentQuestion.False3;
  answerButtonsEl[answer].setAttribute("onclick", "correctAnswer(this.id)");
  answerButtonsEl[false1].setAttribute("onclick", "wrongAnswer(this.id)");
  answerButtonsEl[false2].setAttribute("onclick", "wrongAnswer(this.id)");
  answerButtonsEl[false3].setAttribute("onclick", "wrongAnswer(this.id)");

  for (var i = 0; i < answerButtonsEl.length; i++) {
    answerButtonsEl[i].classList.remove("btn-answer-wrong");
    answerButtonsEl[i].classList.remove("btn-answer-correct");
  }

  if (debugMode) {
    answerButtonsEl[answer].textContent += "<-- Answer!";
  }

  ;
} // ANCHOR Game Management Functions


function reset() {
  answerButtonsWrapperEl.style.display = "flex";
  quizAreaEl.style.display = "flex";
  menuButtonsEl.style.display = "none";
  gameOverEl.style.display = "none";
  isGameOver = false;
  score = 0;
  totalScore = 0;
  displayNextQuestion();
  startTimer();
}

function correctAnswer(buttonID) {
  document.getElementById(buttonID).classList.add("btn-answer-correct");
  addScore(questionWorth);
  setTimeout(function () {
    displayNextQuestion();
  }, 1000);
}

function wrongAnswer(buttonID) {
  document.getElementById(buttonID).classList.add("btn-answer-wrong");
  timeLeft -= 5;
  updateTimeLeft();
}

function gameOver() {
  isGameOver = true;
  totalScore = score + timeLeft;
  gameOverEl.style.display = "flex";
  quizAreaEl.style.display = "none";

  if (totalScore > highScores[highScores.length - 1].Score || highScores.length < highScoreContenderMinRank) {
    // If High Score is greater than the lowest high score
    newHighScore();
  } else {
    showHighScores();
  }
}

function newHighScore() {
  newHighScoreEl.style.display = "flex";
  highScoresEl.style.display = "none";
}

function saveHighScore() {
  var highScoreInputElValue = document.getElementById("high-score-input").value;
  var d = new Date();
  var today = d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear();

  var newScore = _objectSpread({}, highScoreObject);

  newScore.Name = highScoreInputElValue;
  newScore.Score = totalScore;
  newScore.Date = today; // NOTE High score list can dynamically change because it is an object array. It is sorted every time it's saved.

  highScores.push(newScore);
  highScores.sort(function (a, b) {
    return b.Score - a.Score;
  });
  console.log("New high score saved!", totalScore);
  updateLocallySavedHighScores();
}

function updateLocallySavedHighScores() {
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function showHighScores() {
  var highScoresTableBody = document.getElementById('high-scores-table-body');
  newHighScoreEl.style.display = "none";
  highScoresEl.style.display = "flex"; // This code limits only highScoreContenderMinRank amount of hih scorers on the screen

  var timesToIterate = 0;

  if (highScores.length > highScoreContenderMinRank) {
    timesToIterate = highScoreContenderMinRank;
  } else {}

  for (var i = 0; i < highScores.length; i++) {
    var newTableRow = document.createElement("tr");
    var newTableHeaderIndex = document.createElement("th");
    var newTableDataInitials = document.createElement("td");
    var newTableDataScore = document.createElement("td");
    var newTableDataDate = document.createElement("td");
    newTableHeaderIndex.textContent = i + 1; // Index of first place (0 + 1 = 1st, etc)

    newTableDataInitials.textContent = highScores[i].Name;
    newTableDataScore.textContent = highScores[i].Score;
    newTableDataDate.textContent = highScores[i].Date;
    highScoresTableBody.appendChild(newTableRow);
    newTableRow.appendChild(newTableHeaderIndex);
    newTableRow.appendChild(newTableDataInitials);
    newTableRow.appendChild(newTableDataScore);
    newTableRow.appendChild(newTableDataDate);
  }
}

function startTimer() {
  timeLeft = allottedTimeAtStart;
  var timer = setInterval(function () {
    if (!isGameOver) {
      timeLeft--;
      updateTimeLeft();
    }
  }, 1000);
}

function updateTimeLeft() {
  timeRemainingEl.textContent = timeLeft.toString();

  if (timeLeft <= 0) {
    gameOver();
  }
}

function addScore(_int) {
  score += _int;
  scoreEl.textContent = score.toString();
} // ANCHOR Utility Functions


function random(length) {
  return Math.floor(Math.random() * length);
}

highScoreButtonEl.addEventListener('click', function (event) {
  saveHighScore();
  showHighScores();
}); // ANCHOR Debug Functions

function debugSkip() {
  gameOver();
}

function checkIfDebug() {
  if (debugMode) {
    document.getElementById('debug-skip').style.display = "flex";
  }
}

init();
checkIfDebug();