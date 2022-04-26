import $, { isEmptyObject } from 'jquery';

type Questions = [{
    "question": string;
    "options": [string];
    "correctAnswer": number;
}];

// load the window into the HTML document
(function loadWindow() {
  console.log('Loading quiz app...');
  $('.window').empty().load('imports/quiz.html');

  // get the questions from the JSON and parse it to the loader function
  $.getJSON("imports/questions.json", (data) => loadQuestion(shuffleArray(data), 0));

} ())

// Display the Question on the page
function loadQuestion(questions: Questions, questionNumber: number) {
  console.log("Question: " + questionNumber);

  // if the question number is greater than the length of the questions array
  // quit the quiz and display the results
  if (questionNumber === questions.length) {
    console.log('Quiz is over!');
    displayResults();
    return;
  }

  console.log('Displaying question...');
  
  $('#question-number').text(`#${questionNumber + 1}, `);
  $('#question-text-content-text').text(questions[questionNumber].question);

  questions[questionNumber].options.forEach((option, index) => {
    $('#question-choices').append(`<div> <input type="radio" id="answer-${index}" name="question"> <label for="answer-${index}">${option}</label> </div>`);
  });
}

function displayResults() {
  console.log('Displaying results...');
}

function shuffleArray(array: [any]) {
  let currentIndex: number = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array as [any];
}
