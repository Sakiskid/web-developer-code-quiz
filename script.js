/*

    // TODO 

    1. Layout
    2. Working Quiz (draws questions from a JSON)
    DONE! 3. saving high scores   
    4. restart button
    5. fix stupid css and make it pretty with ANIMATIONS!!!
    6. add questions!

    bonus:

    multiple categories (html, css, javascript, all)

*/


// ANCHOR DOM Elements & Variables
var quizAreaEl = document.getElementById("quiz-area");
var gameOverEl = document.getElementById("game-over");
var answerButtonsWrapperEl = document.getElementById("buttons-answers");
var answerButtonsEl = document.getElementsByClassName("btn-answer");
var descriptionTextEl = document.getElementById("description-text");
var menuButtonsEl = document.getElementById("buttons-menu");
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
}
var highScores = [];

var debugMode = false;
var highScoreContenderMinRank = 3; // Fancy way of saying you need to be in top 3 to list on the high scores
var score = 0;
var totalScore = 0;
var questionWorth = 10;
var timePenalty = 5;
var allottedTimeAtStart = 90;
var timeLeft = 0;
var isGameOver = false;



// ANCHOR Question Handling
let questionsNotYetAsked = [];
let jsQuestions = [];
let currentQuestion = {};

function init() {
    addQuestionsToMainScript();
    initializeHighScores();
}

function addQuestionsToMainScript() {
    for (let i = 0; i < jsQuestionsToAdd.length; i++) {
        jsQuestions.push(jsQuestionsToAdd[i]);
        questionsNotYetAsked.push(i);
    }
}

function initializeHighScores() {
    //TODO initialize rest of highscores
    var savedScores = localStorage.getItem("highScores");

    if (savedScores) {
        savedScores = JSON.parse(savedScores);
        highScores = [];
        for (let i = 0; i < savedScores.length; i++) {
            highScores.push(savedScores[i]);
        }
    }
    else {
        updateLocallySavedHighScores();
    }
}

function displayNextQuestion() {
    if (questionsNotYetAsked.length === 0) { gameOver(); return; }

    // Choose a random question, then remove it from the available questions index
    let nextQuestionIndex = questionsNotYetAsked[random(questionsNotYetAsked.length)];
    currentQuestion = jsQuestions[nextQuestionIndex];
    questionsNotYetAsked.splice(questionsNotYetAsked.indexOf(nextQuestionIndex), 1);

    // Display the question
    questionEl.textContent = currentQuestion.Question;
    descriptionTextEl.textContent = currentQuestion.Description;

    displayAnswers();
}

function displayAnswers() {
    let availableButtons = [0, 1, 2, 3];

    let answer = availableButtons[random(availableButtons.length)];
    availableButtons.splice(availableButtons.indexOf(answer), 1);

    let false1 = availableButtons[random(availableButtons.length)];
    availableButtons.splice(availableButtons.indexOf(false1), 1);

    let false2 = availableButtons[random(availableButtons.length)];
    availableButtons.splice(availableButtons.indexOf(false2), 1);

    let false3 = availableButtons[random(availableButtons.length)];
    availableButtons.splice(availableButtons.indexOf(false3), 1);

    answerButtonsEl[answer].textContent = currentQuestion.Answer;
    answerButtonsEl[false1].textContent = currentQuestion.False1;
    answerButtonsEl[false2].textContent = currentQuestion.False2;
    answerButtonsEl[false3].textContent = currentQuestion.False3;

    answerButtonsEl[answer].setAttribute("onclick", "correctAnswer()");
    answerButtonsEl[false1].setAttribute("onclick", "wrongAnswer()");
    answerButtonsEl[false2].setAttribute("onclick", "wrongAnswer()");
    answerButtonsEl[false3].setAttribute("onclick", "wrongAnswer()");

    if (debugMode) { answerButtonsEl[answer].textContent += "<-- Answer!" };
}

// ANCHOR Game Management Functions
function reset() {
    menuButtonsEl.style.display = "none";
    answerButtonsWrapperEl.style.display = "flex";
    isGameOver = false;
    score = 0;
    totalScore = 0;
    displayNextQuestion();
    startTimer();
}

function correctAnswer() {
    console.log("Answer Correct!");
    addScore(questionWorth);
    displayNextQuestion();
}

function wrongAnswer() {
    console.log("Wrong Answer! Too bad.");
    timeLeft -= 5;
    updateTimeLeft();
}

function gameOver() {
    isGameOver = true;
    totalScore = score + timeLeft;
    gameOverEl.style.display = "flex";
    quizAreaEl.style.display = "none";

    if (totalScore > highScores[highScoreContenderMinRank - 1].Score) {
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

    let newScore = {
        ...highScoreObject,
    }
    newScore.Name = highScoreInputElValue;
    newScore.Score = totalScore;
    newScore.Date = today;

    // NOTE High score list can dynamically change because it is an object array. It is sorted every time it's saved.
    highScores.push(newScore);
    highScores.sort(function (a, b) { return b.Score - a.Score });
    console.log("New high score saved!", totalScore);
    updateLocallySavedHighScores();
}

function updateLocallySavedHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function showHighScores() {
    var highScoresTableBody = document.getElementById('high-scores-table-body');
    newHighScoreEl.style.display = "none";
    highScoresEl.style.display = "flex";

    //TODO for each high score, append it
    for (let i = 0; i < highScoreContenderMinRank; i++) {
        var newTableRow = document.createElement("tr");
        var newTableHeaderIndex = document.createElement("th");
        var newTableDataInitials = document.createElement("td");
        var newTableDataScore = document.createElement("td");
        var newTableDataDate = document.createElement("td");

        newTableHeaderIndex.textContent = (i + 1); // Index of first place (0 + 1 = 1st, etc)
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

function addScore(int) {
    score += int;
    scoreEl.textContent = score.toString();
}

// ANCHOR Utility Functions
function random(length) {
    return Math.floor(Math.random() * length);
}

// ANCHOR Event Listeners
startButtonEl.addEventListener('click', function (event) {
    reset();
});

highScoreButtonEl.addEventListener('click', function (event) {
    saveHighScore();
    showHighScores();
});

init();