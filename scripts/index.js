let startBtn = document.getElementById("start");
let goBackBtn = document.getElementById("goBack");
let submitScoreBtn = document.getElementById("submitScore");
let clearScoresBtn = document.getElementById("clearScores");
let initialsEl = document.getElementById("initials");
let results = document.getElementById("result");
let currentIndex = 0;
let answers = document.getElementById("choice");
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
    
    for (let i = 0; i < currentQuestions.option.length; i++) {
        let choice = currentQuestions.option[i];
        let buttonChoices = document.createElement('button');
        buttonChoices.setAttribute('class', choice);
        buttonChoices.setAttribute('value', choice);
        buttonChoices.textContent = i + 1 + ' ' + choice;
        answers.appendChild(buttonChoices);
    }
}

function checkAnswer (event){
    let buttonClick = event.target;
    // fix logic to handle no choice being click
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
        results.setAttribute('class', 'result hide');
    }, 1000);
    currentIndex++;
    // We need to check if timer is out or not

    if (currentIndex === questions.length) {
       // add end function
       console.log('end')
       endGame();
      } else {
        promptData();
      }
}

function countdownTimer() {
    var timeInterval = setInterval(function () {
        timeLeft--;
    
      if(timeLeft <= 0 || currentIndex >= 4) {
        clearInterval(timeInterval);
        endGame();
      }
      timerEl.textContent = `Time: ${timeLeft}`;
    }, 1000);
  }

function endGame() {
    timerEl.textContent = `Time: ${timeLeft}`;
    quizBlockEl.classList.add("displayNone");
    endGameBlockEL.classList.remove("displayNone");
    finalScoreEl.textContent = `Your final score is ${timeLeft}`;
}

function highScore() {
    startScreenEL.classList.add("displayNone");
    navHeaderEL.classList.add("displayNone");
    endGameBlockEL.classList.add("displayNone");
    highScoresEl.classList.remove("displayNone");
    if(scoresListEl.textContent === ""){
        scoresListEl.textContent = "No high scores.";
    } else {
    scoresListEl.textContent = `1 : ${localStorage.getItem("userInitials")} - ${localStorage.getItem("hiScore")}`;
    }
}

function returnToGame() {
    console.log("btn works");
    quizBlockEl.classList.add("displayNone");
    startScreenEL.classList.remove("displayNone");
    navHeaderEL.classList.remove("displayNone");
    highScoresEl.classList.add("displayNone");
    resetVariables();
}

function resetVariables() {
    timeLeft = 75;
    timerEl.textContent = `Time: ${timeLeft}`;
    currentIndex = 0;
    results.textContent = "";
}

function saveHighScore() {
    localStorage.setItem("userInitials", initialsEl.value);
    localStorage.setItem("hiScore", timeLeft);
    highScore();
}

function clearHighScores() {
    localStorage.removeItem("userInitials");
    localStorage.removeItem("hiScore");
    scoresListEl.textContent = "No high scores.";
}

viewHighScoresEl.onclick = highScore;

clearScoresBtn.onclick = clearHighScores;

submitScoreBtn.onclick = saveHighScore;

goBackBtn.onclick = returnToGame;

answers.onclick = checkAnswer;

startBtn.onclick = startQuiz;

