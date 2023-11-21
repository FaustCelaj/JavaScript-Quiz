//declaring my const
//screens / sections to display
const introScreen = document.getElementById("intro.screen");
const questionScreen = document.getElementById("question.screen");
const finishScreen = document.getElementById("finish.screen");
const highscoresScreen = document.getElementById("highscores.screen");

//buttons
const startButton = document.getElementById("start.button");
const submitButton = document.getElementById("submit.button");
const playAgainButton = document.getElementById("play.again.button");
const clearHighscoreButton = document.getElementById("clear.highscore.button");
// const choice = document.getElementById("choice");

//elements
const questionDisplay = document.getElementById("question.display");
const questionOptions = document.getElementById("question.options");
const newButton = document.createElement("button");
const timerElement = document.getElementById("timer");
const progress = document.getElementById("progress"); 
const scoreList = document.getElementById("score.list");
const yesOrNo = document.getElementById("status");
const scorePreviewText = document.getElementById("score.preview.text");
const usernameInput = document.getElementById("username.input")
const errorMsg = document.getElementById("error.msg")

let timer;
let timerCount;
let currentQuestionIndex = 0;
let score = 0;

//list of my questions
const questions = [
    //0
    {
        question: "How does a FOR loop start?",
        answers: [ 
            { text: "for (i <= 5; i++)", correct: false},
            { text: "for (i <= 0; i <= 5)", correct: false},
            { text: "for i = 1 to 5", correct: false},
            { text: "for (i = 0; i <= 5; i++)", correct: true}
      ]
    },
    //1
    {
        question: "How can you add a comment in a JavaScript?",
        answers: [
            {text: "'This is a comment'", correct: false},
            {text: "&lt;!--This is a comment--&gt;", correct: false},
            {text: "//This is a comment", correct: true},
            {text: "/* This is a comment", correct: false}
      ]
    },
    //2
    {
        question: "How can you detect the client's browser name?",
        answers: [
            {text: "browser.name", correct: false},
            {text: "client.navName", correct: false},
            {text: "navigator.appName", correct: true},
            {text: "window.name", correct: false},
      ]
    },
    //3
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            {text: "Both the <head> section and the <body> section are correct ", correct: true},
            {text: "The &lt;head&gt; section", correct: false},
            {text: "The &lt;body&gt; section", correct: false},
            {text: "the &lt;main&gt; section", correct: false}
        ]
    },
    //4
    {
        question: "How to write an IF statement for executing some code if i is NOT equal to 5?",
        answers: [
            {text: "if (i === 5)", correct: true},
            {text: "if (i != 5)", correct: false},
            {text: "if i =! 5 else", correct: false},
            {text: "if i <= 5", correct: false}
        ]
      }
];


//call startQuiz by clicking on the "lets go" button
startButton.addEventListener('click', startQuiz);

//goes to question screen
function goQuizScreen() {
    introScreen.setAttribute("style", "display: none")
    questionScreen.setAttribute("style", "display: block");
};

// starts timer
function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = `Time left: ${timerCount}`;
        //sends user to submit screen
        if (timerCount <= 0) {
            clearInterval(timer);
            goSubmitScreen();
        }
    }, 1000);
};

//starts quiz
function startQuiz() {
    timerCount = 30;
    goQuizScreen();
    startTimer();
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion ();
};

//function to show questions
function renderQuestion() {

    //clears existing questions
    questionOptions.innerHTML = "";

    //takes the question and displays it in the HTML - line 36
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionDisplay.innerHTML = questionNumber + ". " + currentQuestion.question;

    //show question number at the bottom
    progress.innerHTML = "Question: " + questionNumber + "/5 ";

    //now for the answer options to be displayed
    currentQuestion.answers.forEach(answer => {
        let newButton = document.createElement("button");
        newButton.innerHTML = answer.text;
        newButton.classList.add("button");
        questionOptions.appendChild(newButton);

        //add for click to track answers
        if (answer.correct) {
            newButton.dataset.correct = answer.correct;
        }
        newButton.addEventListener('click', selectAnswer,);
    });
};

//select answer function
//paramater of event is the click of the button to run this function
function selectAnswer(event) {
    const pressedButton = event.target;
    const isCorrect = pressedButton.dataset.correct === "true";

    //shows status of answer on botom left of quiz
    if (isCorrect) {
        yesOrNo.innerHTML = "Correct!";
        score++;
        // localStorage.setItem("score", score);
    } else {
        yesOrNo.innerHTML = "Wrong!";
        timerCount = timerCount -5;
    };

    //disables buttons after selecting your answer and proceeds to next question
    //array.from makes new simple array so it can apply the disable on all the buttons
    Array.from(questionOptions.children).forEach(newButton => {
        newButton.disabled = true;
    });
    showNextQuestion();
};

// goes to next question
function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        clearInterval(timer);
        goSubmitScreen();
    }
}

// stops quiz and goes to screen for the user to submit name and shows score
// resets timer and removes the bottom bar info
function goSubmitScreen() {
    questionScreen.setAttribute("style", "display: none");
    finishScreen.setAttribute("style", "display: flex");
    clearInterval(timer);
    timerElement.textContent = "Time's up!"
    scorePreviewText.textContent = `You scored: ${score}`;
    yesOrNo.setAttribute("style", "display: none");
    progress.setAttribute("style", "display: none");
}

//to show msg if placeholder is left blank
function displayMessage(message, type) {
    errorMsg.textContent = message;
    errorMsg.setAttribute ("class", type);
}

// Function to show all scores in the high scores list
function renderAllScores() {
    scoreList.innerHTML = "";
    let userScore = JSON.parse(localStorage.getItem("user"));
    console.log(userScore);
    // turns the parsed info to show as new <li>
    let scoreEntry = document.createElement("li");
    scoreEntry.textContent = `${userScore.userName} ----- ${userScore.score}`;
    scoreList.appendChild(scoreEntry);
}

//sends the score and name to local storgae and proceeds to next screen
submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("submit button clicked");
    let user = {
        userName: usernameInput.value,
        score: score,
    };
    localStorage.setItem("user", JSON.stringify(user));
    console.log('user is stored');
    if (usernameInput.value === "") {
        displayMessage("Username cannot be blank");
    } else {
        renderAllScores();
        goScoreScreen();
    }
});

//shows user score screen along with previous attempts
function goScoreScreen() {
    finishScreen.setAttribute("style", "display: none");
    highscoresScreen.setAttribute("style", "display: block");
    renderAllScores();
};

//sets user back to play again
playAgainButton.addEventListener('click', function goHome() {
    highscoresScreen.setAttribute("style", "display: none");
    questionScreen.setAttribute("style", "display: none");
    finishScreen.setAttribute("style", "display: none");
    introScreen.setAttribute("style", "display: flex");
    timerElement.textContent = "Timer : 00";
});

//clears scores
clearHighscoreButton.addEventListener('click', function() {
    localStorage.clear();
});
