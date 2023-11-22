# JavaScript-Quiz

## The Goal
I was tasked to develop a quiz for users to take to test their JavaScript knowledge. This task helped me understand and further develop my JavaScript skills along with practicing DOM manipulation to get the desired results.

You can view the live application [here](https://faustcelaj.github.io/JavaScript-Quiz/)

## Table Of Contents
  1. [How I Planned The Quiz](https://github.com/FaustCelaj/JavaScript-Quiz/edit/main/README.md#how-i-planned-the-quiz)
  2. [HTML](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#html)
  3. [CSS](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#css)
  4. [JavaScript](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#javascript)
  5. [Declaring Variables](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#declaring-variables)
  6. [Switching Phases](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#switching-phases)
  7. [The Questions](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#the-questions)
  8. [Questions and Answers](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#questions-and-answers)
  9. [Capturing user info](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#capturing-user-info)
  10. [Scores](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#scores)
  11. [Images](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#images)


## How I Planned The Quiz
I decided to deconstruct the quiz into 4 parts/phases. Start, Quizz, Submit, and End/Highscore.
  - __Start:__ First screen the user is introduced to. The only purpose is to start the quiz/proceed to the next phase. Once started a timer will count down immediately on the top bar.
  - __Quiz:__ Here the timer will start to tick down from 30 seconds, this is done in JS. Below will display the question and 4 buttons with answers to choose from. These are generated in JS and pulled from an array. Along with this, on the bottom bar, depending on what the user selects there will be a right or wrong text that pops up and some text to display what question they are on. Once the quiz is finished or the timer runs to 0, the user will be pushed to the next phase.
  - __Submit:__ Here the user has displayed the score they got (done by counting how many right answers in the last section). They are prompted to submit their username and will get pushed to the next phase once done.
  - __Highscore:__ Will be a display of the user's score from their current attempt along with the name they submitted. It will also show previous attempts. Users can clear the high scores. Users will also be able to play again and restart the phases (goes to phase 1)


## HTML
- The `<main>` element houses all the components of the quiz.
- `<header class="top-bar">` contains our quiz title and our timer
- Element of `<section class="quiz-container">` will be what houses each phase of the quiz mentioned above. They are all listed in the HTML but are set to be hidden. This is explained [below in CSS](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#css)
- `<div id="intro.screen" class="intro-screen">` is where the user starts, the the button is clicked they are taken to the next phase
- `<div id="question.screen" class="question-screen">` is a phase that will be mostly generated in JavaScript. [Can view it here](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#displaying-questions-and-answers)
    - `<h3 id="question.display">` will pull the question from our object [array](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#the-questions). This will change dynamically for each question that we move on to.
    - `<ul id="question.options">` will pull the answers for the corresponding question object.
- `<div id="finish.screen" class="finish-screen">` shows the user the score they got and requests a name to be submitted. The Submit button then captures the information and scores it in local storage to be displayed next screen.
- `<div id="highscores.screen" class="highscores-screen">` displays the users curent score. if they had a previous attempt it will show that as well. The play again button goes back to the intro screen and starts again. Also provided the option to clear local storage.
- `<section class="status-container">` is only active when the questions are being shown.
    - `<h4 id="status".` will show the user if the answer they selected is right or wrong.
    - `<h5 id="progress">` will show is our current question index

There were no challenges faced in creating the HTML structure of the quiz.


## CSS
The CSS was very straightforward, only two key things to mention:
> #### `Disaply: none`
> 
> All of the phases needed their display to be set to none to allow the switching to occur. The only exception was the first phase, Start, as that is the screen that must always be present when the user first loads in. When a specific event occurs the display will be changed to the default setting or flex depending on the element and hide the previous phase

> #### Styling for appended elements
> Ex. One of many but `<ul id="question.options" class="question-options"></ul>` is something that contains no content and will not be shown on the screen. These were styled for when they were created by JS.

There was also a reset stylesheet created to default the browser settings.


## JavaScript

This is where most of the work was done for the project. The biggest challenge I faced was how to cycle through my array of questions and answers to display the appropriate information. Below I have listed each of the larger tasks

### Declaring Variables
To start our JS script the first thing that needed to be done was to declare all of our constants and variables. These would be broken up into 3 sections, screens (phases), buttons, and elements. Each one was selected by using `document.getElementById` and anmed accordingly after the id that was selected. These variables would be all the items I would later manipulate to cycle through phases and capture information.

### Switching Phases
The way I switched between phases was to `addEventListener` to button variables, which were listed above. These listeners would capture the event of a `click` and run a function.
Multiple functions were made for each switching of phases in the quiz as they all needed to do different things or capture information.

This is an example of one of the functions.

```js
function goQuizScreen() {
    introScreen.setAttribute("style", "display: none")
    questionScreen.setAttribute("style", "display: block");
};
```

As stated in the CSS our displays were set to none for most of the screens. this function turns on the next display and turns off the previous one. This allows us to go to the next phase.

In the end, if the user wants to play again we have to reset everything to its original state.

```js
playAgainButton.addEventListener('click', function goHome() {
    highscoresScreen.setAttribute("style", "display: none");
    questionScreen.setAttribute("style", "display: none");
    finishScreen.setAttribute("style", "display: none");
    introScreen.setAttribute("style", "display: flex");
    timerElement.textContent = "Timer : 00";
});
```


### Timer
The process behind the timer was relatively simple. It needed to start once the start button was hit and increment down by 1 second. once the timer hit 0 we would be pushed to the next phase. This was done with the `setInterval()` and `clearInterval()` functions.
A condition to look out for was the timer needed to drop by 5 seconds if the user selected the wrong answer. This was done in the `function selectAnswer(event)` by an if-else loop. When this was done I realized that the timer can go negative and that the parameters of the timer if statement needed to be changed from `if (timerCount === 0)` to `if (timerCount <= 0)` so we could account for negative values.


### The Questions

Below is an example of two questions in my array.

```js
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
```

The questions consist of an array of 5 objects (5 Questions), and deeper in is another object(questions) that contains our crucial information, the questions, and another object (answers) to each. Lastly in the answers, the is yet another array of objects that contains text and a boolean to allow us to determine which answer is right and wrong.

Many articles and videos I watched helped me understand how to pick information out of the array accurately and display what I wanted. These were some of the ones that helped me the most:
- (https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/)
- (https://www.freecodecamp.org/news/javascript-foreach-how-to-loop-through-an-array-in-js/)
- (https://stackoverflow.com/questions/9329446/loop-for-each-over-an-array-in-javascript)


### Questions and Answers

This process is made up of three parts
1. `function renderQuestion()`
  I first needed to start off by declaring some variables

```js
let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionDisplay.innerHTML = questionNumber + ". " + currentQuestion.question;
```

  these variables would later help cycle through the questions array. `[currentQuestionIndex]` was declared in the beginning as 0. The last line in the snippet above targets our question display ID in the HTML and uses `.innerHTML` to change the text value with the current question's (object) question.

  Next, I tackled creating and displaying each of the answers by using a forEach loop.

```js
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
```

  Similar to displaying the questions I was able to cycle through the questions and target their answers. Each of the answers would then create a new button that holds the text. This is added as a class to style it from the CSS and appended to the question options element in the HTML.

3. `function selectAnswer(event)`
  With the help of [this article from MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), I was able to understand how to use the boolean value in the array.

```js
function selectAnswer(event) {
    const pressedButton = event.target;
    const isCorrect = pressedButton.dataset.correct === "true";
```

  After the event, I set up a simple if-else to increase the score and decrease time depending on whether the dataset is true or false.

  Lastly, I had to disable each button after it was clicked. This was done with the following code:

  ```js
 Array.from(questionOptions.children).forEach(newButton => {
        newButton.disabled = true;
    });
```
  Here we are able to make an array from each of the question option children (newly created buttons) and for each of them, we can simply disable them.

5. `function showNextQuestion()`
  The goal here was to add the the question index so that we could move on to the next object in the array aka the next question. I also needed to add a if else to make sure if we are on the last question we can stop the timer and move to the submit screen. If it's lower than the length of the array we simply loop back to `function renderQuestion()`.
  A line of code that needed to be added to the rendered questions was `questionOptions.innerHTML = "";` to clear all of the buttons created every time so we could make new ones with new questions.

```js
function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        clearInterval(timer);
        goSubmitScreen();
    }
}
```

### Capturing User Info

Our variable of score kept track of all the increases from selecting the right answer when the quiz started. Capturing the information takes place in the submit screen. To kick off the process the submit button must be clicked but the user must enter a name to continue. once this info is supplied and the button is clicked we run the following code:

```js
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
```

Here we can see an event listener was added to track the click of the button. we created an object to store the user's info. With `localStorage.setItem("user", JSON.stringify(user))` we can store the info as a string.


### Scores

Finally, at the highscore screen, we can see the score is presented with the information stored in the previous step. All we needed to do was get the previously stored info and create text to the Score Entry element of the HTML. The following code showcases this. 

```js
function renderAllScores() {
    let userScore = JSON.parse(localStorage.getItem("user"));
    console.log(userScore);
    // turns the parsed info to show as new <li>
    let scoreEntry = document.createElement("li");
    scoreEntry.textContent = `${userScore.userName} ----- ${userScore.score}`;
    scoreList.appendChild(scoreEntry);
```

Lastly to clear the scores we can use `localStorage.clear();` which deletes the browser's local storage. 

## Images

![Start Screen](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/start.png)
![Quiz Screen](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/quiz.png)
![Submit Screen](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/submit.png)
![End Screen](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/highscore.png)


