/*

    // TODO 

    1. Layout
    2. Working Quiz (draws questions from a JSON)
    3. saving high scores   

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
var timeRemainingEl = document.getElementById('time-remaining');

var score = 0;
var questionWorth = 10;
var timePenalty = 5;
var allottedTimeAtStart = 90;
var timeLeft = 0;

// ANCHOR Question Handling
let questionsNotYetAsked = [];
let questions = [];
let currentQuestion = {};

function init() {
    addQuestionsToMainScript();
}

function addQuestionsToMainScript() {
    for (let i = 0; i < questionsToAdd.length; i++) {
        questions.push(questionsToAdd[i]);
        console.log("Current questions: ", questions);
        questionsNotYetAsked.push(i);
    }
}

function displayNextQuestion() {
    if (questionsNotYetAsked.length === 0) { gameOver(); }

    // Choose a random question, then remove it from the available questions index
    let nextQuestionIndex = random(questionsNotYetAsked.length);
    currentQuestion = questions[nextQuestionIndex];
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
}

// ANCHOR Game Management Functions
function correctAnswer() {
    console.log("Answer Correct!");
    score += questionWorth;
    displayNextQuestion();
}

function wrongAnswer() {
    console.log("Wrong Answer! Too bad.");
    timeLeft -= 5;
    updateTimeLeft();
}

function gameOver() {
    console.log("Game Over! Final Score: ", score);
    gameOverEl.style.display = "flex";
    quizAreaEl.style.display = "none";
}

function startTimer() {
    timeLeft = allottedTimeAtStart;
    var timer = setInterval(function () {
        timeLeft--;
        updateTimeLeft();
    }, 1000);
}

function updateTimeLeft() {
    timeRemainingEl.textContent = timeLeft.toString();
    if(timeLeft <= 0) {
        gameOver();
    }
}

// ANCHOR Utility Functions
function random(length) {
    return Math.floor(Math.random() * length);
}


// ANCHOR Event Listeners
startButtonEl.addEventListener('click', function (event) {
    menuButtonsEl.style.display = "none";
    answerButtonsWrapperEl.style.display = "flex";
    score = 0;
    displayNextQuestion();
    startTimer();
});

init();