let startBtn = document.getElementById("start");
let goBackBtn = document.getElementById("goBack");
let submitScoreBtn = document.getElementById("submitScore");
let clearScoresBtn = document.getElementById("clearScores");

let results = document.getElementById("result");
let currentIndex = 0;
let answers = document.getElementById("choice");
let timerEl = document.getElementById("timer");
let timeLeft = 75;
let gameEl = document.getElementById("game");
let highScoresEl = document.getElementById("highScores")
let finalScoreEl = document.getElementById("finalScore");

let quizBlockEl = document.getElementById("quizBlock");
let endGameBlockEL = document.getElementById("endGameBlock");


function startQuiz(){
    promptData();
    countdownTimer();
    startBtn.classList.add("displayNone");
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
        timerEl.textContent = `Time: ${timeLeft}`;
    
      if(timeLeft <= 0 || currentIndex === 4) {
        clearInterval(timeInterval);
      }
    }, 1000);
  }

function endGame() {
    gameEl.classList.add("displayNone");
    endGameBlockEL.classList.remove("displayNone");
    finalScoreEl.textContent = `Your final score is ${timeLeft}`;
}

function highScore() {
    highScoresEl.classList.remove("displayNone");
    console.log(timeLeft);
}

function returnToGame() {
    console.log("btn works");
    quizBlockEl.classList.add("displayNone");
    startBtn.classList.remove("displayNone");
    gameEl.classList.remove("displayNone");
    highScoresEl.classList.add("displayNone");
    resetVariables();
}

function resetVariables() {
    timeLeft = 75;
    timerEl.textContent = `Time: ${timeLeft}`;
    currentIndex = 0;
    results.textContent = "";
}
// Need to attach timer ID to javascript
// Make the time count down
// Add a function that end the game
// Add function that save the score to local storage
// Save Highscore
// Need to know if it's the end of the page

submitScoreBtn.onclick = highScore;

goBackBtn.onclick = returnToGame;

answers.onclick = checkAnswer;

startBtn.onclick = startQuiz;

