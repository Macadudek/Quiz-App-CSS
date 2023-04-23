"use strict";

const quizData = [
  {
    questionCount: 1,
    question: "Which of the following is not a real eCommerce platform?",
    a: "Shopify",
    b: "WooCommerce",
    c: "ShopCommerce",
    d: "BigCommerce",
    correct: "c",
  },
  {
    questionCount: 2,
    question: "If Shopify is so good, why are Shopify developers necessary?",
    a: "To save time on things like store setups and migrations",
    b: "To extend the limited design options and functionalities of themes with custom code",
    c: "To provide support with a deep understanding of how the platform works and what its limitations are",
    d: "All of the above",
    correct: "d",
  },
  {
    questionCount: 3,
    question: "Which of the following is true about Shopify developers?",
    a: "They are paid extremely well",
    b: "There is a high demand for them",
    c: "They need to know web development, the platform itself, and the liquid template language",
    d: "All of the above",
    correct: "d",
  },
];

const questionCount = document.getElementById('question-count')
const question = document.getElementById("question");
const a = document.getElementById("a+");
const b = document.getElementById("b+");
const c = document.getElementById("c+");
const d = document.getElementById("d+");
const nextBtn = document.getElementById("submit");
const allAnswer = document.querySelectorAll(".answer");
const displayScore = document.querySelector('#score-results')

const startQuizContainer = document.querySelector('.start-quiz_container')
const gameContainer = document.querySelector('.game-container')
const endQuizContainer = document.querySelector('.end-quiz_container')
const startBtn = document.querySelector('#start-btn')
const resetBtn = document.querySelector('#reset-btn')
const btnContainer = document.querySelector('.btn-align')
const prevBtn = document.querySelector('#prev-btn')



let index, correctAnswers;

function getScore(){
  return correctAnswers.filter((x) => x === true).length
}

// Start the quiz

startBtn.addEventListener('click', () => {
  startQuizContainer.classList.add('hidden')
  gameContainer.classList.remove('hidden')
  btnContainer.classList.remove('hidden')
})

// Get the getSelected answer
const getSelected = function () {
  let ans = 0;
  let ansSelected = false

  allAnswer.forEach((el) => {
    if (el.checked) {
      ans = el.id;
      ansSelected = true
    }
});

console.log(ans, ansSelected);
    if (ansSelected) {
        return ans
    } else {
        alert('Select answer to advance')
    }
    
}

// Disselect all answers
const deselectAns = function() {
  allAnswer.forEach((el) => {
    el.checked = false;
  });
}

// Load the quiz data dynamically
const getQuiz = function() {
  deselectAns();
  questionCount.innerText = `Question ${quizData[index].questionCount} out of 3`
  question.innerText = quizData[index].question;
  a.innerHTML = `${quizData[index].a}`;
  b.innerHTML = `${quizData[index].b}`;
  c.innerHTML = `${quizData[index].c}`;
  d.innerHTML = `${quizData[index].d}`;

  // If first question hide BACK button
  index === 0 ? prevBtn.classList.add('hidden') : prevBtn.classList.remove('hidden')
}


// Move the quiz forward, check for correct answers and end quiz if last question completed
const startQuiz = function() {
  nextBtn.addEventListener("click", () => {
    let ans = getSelected();
    
      if (ans === quizData[index].correct) {
        correctAnswers.push(true);
        index++;
        console.log(index, getScore());
      } else {
        correctAnswers.push(false);
        index++;
      }
    
    
    if (index < quizData.length) {
      getQuiz();
    } else {
      endQuiz()
    }
  });
}

// Move quiz backwards 
const prevQuestion = function() {
    index--;
    correctAnswers.pop();
    
    getQuiz();
    console.log(index, getScore());
}

prevBtn.addEventListener('click', () => {
        prevQuestion()
})



// Show end quiz window and score, if restart btn clicked restart the game
const endQuiz = function() {
    gameContainer.classList.add('hidden')
    btnContainer.classList.add('hidden')
    endQuizContainer.classList.remove('hidden')
    displayScore.innerHTML = `Your score is ${getScore()} out of ${quizData.length}`

    
    resetBtn.addEventListener('click', resetQuiz)
}

const resetQuiz = function() {
        startQuizContainer.classList.remove('hidden')
        endQuizContainer.classList.add('hidden')
        index = 0
        correctAnswers = [];
        // location.reload()
        getQuiz();
        startQuiz();
        console.log(index, correctAnswers);

}


const init = function() {
  index = 0
  correctAnswers = [];
}
getQuiz();
startQuiz();

