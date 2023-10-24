let start = document.getElementById("start");
let results = document.getElementById("result");
let currentIndex = 0;
let answers = document.getElementById("choice");

function startQuiz (){
    promptData();
}
// This is to get the data from questions.js
function promptData(){
    let currentQuestions = questions[currentIndex];
    let questionTitleEl = document.getElementById("questionTitle");

    questionTitleEl.textContent = currentQuestions.prompt;

    answers.innerHTML = '';
    
    for (let i = 0; i < currentQuestions.option.length; i++) {
        let choice = currentQuestions.option[i];
        let buttonChoices = document.createElement('button');
        buttonChoices.setAttribute('class', choice);
        buttonChoices.setAttribute('value', choice);
        buttonChoices.textContent = i + 1 + '' + choice;
        answers.appendChild(buttonChoices);
    }
}

function checkAnswer (event){
    let buttonClick = event.target;
    // fix logic to handle no choice being click
    // Click on the wrong button
    if(buttonClick.value !== questions[currentIndex].answer){
        //we will have to add timer later
        // Send a message that it's wrong
        results.textContent = "you fail"
    } else {
        results.textContent = "On to the next question";
    }
    results.setAttribute('class', 'result');
    setTimeout(function () {
        results.setAttribute('class', 'result hide');
    }, 1000);
    currentIndex++;
    // We need to check if timer is out or not

    if (currentIndex === questions.length) {
       // add end funciton
       console.log('end')
      } else {
        promptData();
      }
}

// Add time to quiz start
// create a container for timer or varible
// Need to attach timer ID to javascript
// Make the time count down
// Add a function that end the game
// Add function that save the score to local storage
// Save Highscore
// Need to know if it's the end of the page


answers.onclick = checkAnswer;

start.onclick = startQuiz;

