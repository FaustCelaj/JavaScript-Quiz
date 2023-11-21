# JavaScript-Quiz

## The Goal
I was tasked to develop a quiz for users to take to test their JavaScript knowledge. This task helped me understand and further develop my JavaScript skills along with practicing DOM manipulation to get the desired results.

## Table Of Contents
  1. [How I Planned The Quiz]
  2. [HTML](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#html)
  3. [CSS](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#css)
  4. [JavaScript](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#javascript)
  5. [Declaring Variables](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#declaring-variables)
  6. [Switching Phases](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#switching-phases)
  7. [The Questions](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#the-questions)
  8. [Displaying Questions and Answers](https://github.com/FaustCelaj/JavaScript-Quiz/blob/main/README.md#displaying-questions-and-answers)
  9. [Capturing user input]()
  10. [Capturing user name and score]()


## How I Planned The Quiz
I decided to deconstruct the quiz into 4 parts/phases. Start, Quizz, Submit, and End/Highscore.
  - __Start:__ First screen user is introduced to. The only purpose is to start the quiz/proceed to the next phase. Once started a timer will count down immediately on the top bar.
  - __Quiz:__ Here the timer will start to tick down from 30 seconds, this is done in JS. Below will display the question and 4 buttons with answers to choose from. These are generated in JS and pulled from an array. Along with this, on the bottom bar, depending on what the user selects there will be a right or wrong text that pops up and some text to display what question they are on. Once the quiz is finished or the timer runs to 0, the user will be pushed to the next phase.
  - __Submit:__ here the user has displayed the score they got (done by counting how many right answers in the last section). They are prompted to submit their username and will get pushed to the next phase once done.
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

### Declaring Variables

### Switching Phases

### The Questions

### Displaying Questions and Answers
