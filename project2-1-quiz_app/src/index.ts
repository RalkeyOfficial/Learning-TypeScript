import $ from 'jquery';

type Questions = [{
    "question": string;
    "options": [string];
    "answer": number;
}];

let score = 0;

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
  const correctElement = $('#answer-text-correct') as JQuery<HTMLSpanElement>;

  // if the question number is greater than the length of the questions array
  // quit the quiz and display the results
  if (questionNumber === questions.length) {
    console.log('Quiz is over!');
    displayResults(form, questions.length);
    return;
  }
  
  console.log("Question: " + questionNumber);
  console.log('Displaying question...');
  
  // set the question number and question text
  questionNumberElement.text(`#${questionNumber + 1}, `);
  questiontextElement.text(questions[questionNumber].question);

  // empty questions field and put in new questions
  questionAnswersElement.empty()
  questions[questionNumber].options.forEach((option, index) => {
    questionAnswersElement.append(`<div> <input type="radio" id="answer-${index}" name="question"> <label for="answer-${index}">${option}</label> </div>`);
  });

  // on click of the submit button
  // run checks for valid awnser
  // and submit awnser into the score array
  $('#submit-question-button').on('click', (e) => {
    e.preventDefault();

    // get the selected answer and check if it exists
    let selectedAnswer = $('input[name=question]:checked') as JQuery<HTMLInputElement>;
    if (!selectedAnswer || selectedAnswer === null || selectedAnswer === undefined) return

    console.log('Submitting question...');

    // get the index of the selected answer
    const answerNumber: number = parseInt(selectedAnswer.attr('id').split('-')[1]);

    // compare the answer to the correct answer
    // this will return false if the answer has been tampered with in the HTML
    // if the awnser is correct increment the score
    const isCorrect = answerNumber === questions[questionNumber].answer - 1;
    if (isCorrect) score++;

    // display if it was correct of not
    if (isCorrect) {
      correctElement.text('Correct!');
      correctElement.toggle();
    } else {
      correctElement.text('Incorrect!');
      correctElement.toggle();
    }

    setTimeout(() => {
      correctElement.toggle();

      $('#submit-question-button').off();
      loadQuestion(questions, questionNumber + 1);
    }, 2000);
  });
}

function displayResults(form: JQuery<HTMLFormElement>, questionLength: number) {
  console.log('Displaying results...');

  form.empty();

  const percentage = isWhatPercentOf(score, questionLength);
  console.log(`${percentage}`);

  form.append(`<h3>You got ${score} out of ${questionLength} questions correct with a percentage of ${percentage}%</h2>`);

  switch (true) {
    case percentage >= 80:
      form.append(`<p>You are a genius!</p>`);
      break;
    case percentage >= 60:
      form.append(`<p>You could do better</p>`);
      break;
    case percentage >= 40:
      form.append(`<p>You should start learning again</p>`);
      break;
    case percentage >= 20:
      form.append(`<p>You are a failure</p>`);
      break;
    case percentage >= 0:
      form.append(`<p>Just retire</p>`);
  }
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

function isWhatPercentOf(a: number, b: number) {
  return (a / b) * 100;
}
