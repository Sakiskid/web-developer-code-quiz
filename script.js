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
var timeRemainingEl = document.getElementById("time-remaining");
var newHighScoreEl = document.getElementById("new-high-score");
var highScoresEl = document.getElementById("high-scores");
var highScoreButtonEl = document.getElementById("high-score-input-btn");
var scoreEl = document.getElementById("score");

// High scores
var highScore1 = {
    Name: "",
    Score: 0,
    Date: ""
};
var highScore2 = {
    Name: "",
    Score: 0,
    Date: ""
};
var highScore3 = {
    Name: "",
    Score: 0,
    Date: ""
};


var highScores = []

var score = 0;
var totalScore = 0;
var questionWorth = 10;
var timePenalty = 5;
var allottedTimeAtStart = 90;
var timeLeft = 0;
var isGameOver = false;



// ANCHOR Question Handling
let questionsNotYetAsked = [];
let questions = [];
let currentQuestion = {};

function init() {
    addQuestionsToMainScript();
    initializeHighScores();
}

function addQuestionsToMainScript() {
    for (let i = 0; i < questionsToAdd.length; i++) {
        questions.push(questionsToAdd[i]);
        console.log("Current questions: ", questions);
        questionsNotYetAsked.push(i);
    }
}

function initializeHighScores() {
    //TODO initialize rest of highscores
    if(localStorage.getItem("HighScore1")){
        highScore1 = JSON.parse(localStorage.getItem("HighScore1"));
    } else {
        localStorage.setItem("HighScore1", JSON.stringify(highScore1));
    }
    if(localStorage.getItem("HighScore2")){
        highScore2 = JSON.parse(localStorage.getItem("HighScore2"));
    } else {
        localStorage.setItem("HighScore2", JSON.stringify(highScore2));
    }
    if(localStorage.getItem("HighScore3")){
        highScore3 = JSON.parse(localStorage.getItem("HighScore3"));
    } else {
        localStorage.setItem("HighScore3", JSON.stringify(highScore3));
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
    // FIXME if index 0 question is the first question, then index 0 quesiton is shown again after answering correctly
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

    if (totalScore > highScore3.Score) {
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

    console.log("New high score saved!", totalScore);

    if(totalScore > highScore1.Score){
        highScore1.Name = highScoreInputElValue;
        highScore1.Score = totalScore;
        highScore1.Date = today;
        localStorage.setItem("HighScore1", JSON.stringify(highScore1));
    }
    else if(totalScore > highScore2.Score) {
        highScore2.Name = highScoreInputElValue;
        highScore2.Date = today;
        highScore2.Score = totalScore;
        localStorage.setItem("HighScore2", JSON.stringify(highScore2));
    }
    else if (totalScore > highScore3.Score) {
        highScore3.Name = highScoreInputElValue;
        highScore3.Date = today;
        highScore3.Score = totalScore;
        localStorage.setItem("HighScore3", JSON.stringify(highScore3));
    }
    else { console.log ("Something went wrong, high score shouldn't be displaying: Score: ", totalScore); }
}

function showHighScores() {
    newHighScoreEl.style.display = "none";
    highScoresEl.style.display = "flex";

    
    //TODO for each high score, append it
}

function startTimer() {
    timeLeft = allottedTimeAtStart;
    var timer = setInterval(function () {
        if(!isGameOver) {
            timeLeft--;
            updateTimeLeft();
        }
    }, 1000);
}

function updateTimeLeft() {
    timeRemainingEl.textContent = timeLeft.toString();
    if(timeLeft <= 0) {
        gameOver();
    }
}

function addScore (int) {
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