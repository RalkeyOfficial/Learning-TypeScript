import $ from 'jquery';

type Questions = [{
    "question": string;
    "options": [string];
    "answer": number;
}];

const score = [0, 0];

// load the window into the HTML document
(function loadWindow() {
  console.log('Loading quiz app...');
  $('.window').empty().load('imports/quiz.html');

  // get the questions from the JSON and parse it to the loader function
  $.getJSON("imports/questions.json", (data) => loadQuestion(shuffleArray(data), 0));

} ())

// Display the Question on the page
function loadQuestion(questions: Questions, questionNumber: number) {
  // Elements to be used
  const form = $('#quiz-form') as JQuery<HTMLFormElement>;
  const questionNumberElement = $('#question-number') as JQuery<HTMLSpanElement>;
  const questiontextElement = $('#question-text-content-text') as JQuery<HTMLSpanElement>;
  const questionAnswersElement = $('#question-choices') as JQuery<HTMLDivElement>;

  // if the question number is greater than the length of the questions array
  // quit the quiz and display the results
  if (questionNumber === questions.length) {
    console.log('Quiz is over!');
    displayResults();
    return;
  }
  
  console.log("Question: " + questionNumber);
  console.log('Displaying question...');
  
  questionNumberElement.text(`#${questionNumber + 1}, `);
  questiontextElement.text(questions[questionNumber].question);

  questionAnswersElement.empty()
  questions[questionNumber].options.forEach((option, index) => {
    questionAnswersElement.append(`<div> <input type="radio" id="answer-${index}" name="question"> <label for="answer-${index}">${option}</label> </div>`);
  });

  // on click of the submit button
  // run checks for valid awnser
  // and submit awnser into the score array
  $('#submit-question-button').on('click', (e) => {
    e.preventDefault();

    let selectedAnswer = $('input[name=question]:checked') as JQuery<HTMLInputElement>;

    if (!selectedAnswer || selectedAnswer === null || selectedAnswer === undefined) return

    console.log('Submitting question...');

    const answerNumber: number = parseInt(selectedAnswer.attr('id').split('-')[1]);

    if (answerNumber === questions[questionNumber].answer - 1)
    score[1]++;
    else score[0]++;

    $('#submit-question-button').off();
    loadQuestion(questions, questionNumber + 1);
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
