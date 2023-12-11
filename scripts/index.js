let startBtn = document.getElementById("start");
let goBackBtn = document.getElementById("goBack");
let submitScoreBtn = document.getElementById("submitScore");
let clearScoresBtn = document.getElementById("clearScores");
let initialsEl = document.getElementById("initials");
let results = document.getElementById("result");
let currentIndex = 0;
let answers = document.getElementById("choice");
let timeInterval;
let timerEl = document.getElementById("timer");
let timeLeft = 75;
let startScreenEL = document.getElementById("startScreen");
let highScoresEl = document.getElementById("highScores")
let finalScoreEl = document.getElementById("finalScore");
let navHeaderEL = document.getElementById("navHeader");
let quizBlockEl = document.getElementById("quizBlock");
let endGameBlockEL = document.getElementById("endGameBlock");
let scoresListEl = document.getElementById("scoresList");
let viewHighScoresEl = document.getElementById("viewHighScores");

// function to start the quiz
function startQuiz(){
    promptData();
    countdownTimer();
    startScreenEL.classList.add("displayNone");
}
// This is to get the data from questions.js
function promptData(){
    quizBlockEl.classList.remove("displayNone");
    let currentQuestions = questions[currentIndex];
    let questionTitleEl = document.getElementById("questionTitle");
    console.log(currentIndex);
    questionTitleEl.textContent = currentQuestions.prompt;

    answers.innerHTML = '';
    
    //looping through question bank to populate
    for (let i = 0; i < currentQuestions.option.length; i++) {
        let choice = currentQuestions.option[i];
        let buttonChoices = document.createElement('button');
        buttonChoices.setAttribute('class', choice);
        buttonChoices.setAttribute('value', choice);
        buttonChoices.textContent = i + 1 + ' ' + choice;
        answers.appendChild(buttonChoices);
    }
}

// function toe check the answer clicked with the question bank
function checkAnswer (event){
    let buttonClick = event.target;
    // Click on the wrong button
    if(buttonClick.value !== questions[currentIndex].answer){
        // Send a message that it's wrong
        results.textContent = "Wrong"
        timeLeft -=10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    } else {
        results.textContent = "Correct";
    }
    results.setAttribute('class', 'result');
    setTimeout(function () {
        results.setAttribute('class', 'result');
    }, 1000);
    currentIndex++;

    // check to see if at end of question bank to see if needing to prompt data or to end game
    if (currentIndex === questions.length) {
       endGame();
      } else {
        promptData();
      }
}

// function for the countdowm timer
function countdownTimer() {
    timeInterval = setInterval(function () {
        timeLeft--;
    
      if(timeLeft <= 0 || currentIndex === 5) {
        clearInterval(timeInterval);
        endGame();
      }
      timerEl.textContent = `Time: ${timeLeft}`;
    }, 1000);
}

// function for the end of the game page
function endGame() {
    timerEl.textContent = `Time: ${timeLeft}`;
    quizBlockEl.classList.add("displayNone");
    endGameBlockEL.classList.remove("displayNone");
    finalScoreEl.textContent = `Your final score is ${timeLeft}`;
}

// function for the high scores page
function highScore() {
    startScreenEL.classList.add("displayNone");
    navHeaderEL.classList.add("displayNone");
    quizBlockEl.classList.add("displayNone");
    endGameBlockEL.classList.add("displayNone");
    highScoresEl.classList.remove("displayNone");
    if(scoresListEl.textContent === ""){
        scoresListEl.textContent = "No high scores.";
    }
    clearInterval(timeInterval);
    resetVariables();
}

// function for the go back button
function returnToGame() {
    quizBlockEl.classList.add("displayNone");
    startScreenEL.classList.remove("displayNone");
    navHeaderEL.classList.remove("displayNone");
    highScoresEl.classList.add("displayNone");
    resetVariables();
}

// function to reset the variables
function resetVariables() {
    timeLeft = 75;
    timerEl.textContent = `Time: ${timeLeft}`;
    currentIndex = 0;
    results.textContent = "";
}

// function to save high scores to local storage
function saveHighScore() {
    localStorage.setItem("userInitials", initialsEl.value);
    localStorage.setItem("hiScore", timeLeft);
    scoresListEl.textContent = `1 : ${localStorage.getItem("userInitials")} - ${localStorage.getItem("hiScore")}`;
    highScore();
}

// function to clear the high scores from the local storage and from the high score page
function clearHighScores() {
    localStorage.removeItem("userInitials");
    localStorage.removeItem("hiScore");
    scoresListEl.textContent = "No high scores.";
}


// handling the click events for the various buttons
viewHighScoresEl.onclick = highScore;

clearScoresBtn.onclick = clearHighScores;

submitScoreBtn.onclick = saveHighScore;

goBackBtn.onclick = returnToGame;

answers.onclick = checkAnswer;

startBtn.onclick = startQuiz;

