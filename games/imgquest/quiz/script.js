function clone(object) {
  return JSON.parse(JSON.stringify(object))
}

const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const explanationText = document.getElementById("explanation")

var ytsfudtusy = false

function disableButtons() {
  const buttons = answerButtonsElement.querySelectorAll(".btn")
  const btns = [...buttons]
  btns.forEach((btn) => {
    btn.setAttribute("disabled", "disabled")
  })
}

function undisableButtons() {
  const buttons = answerButtonsElement.querySelectorAll(".btn")
  const btns = [...buttons]
  btns.forEach((btn) => {
    btn.removeAttribute("disabled")
  })
}

const bodyElement = document.body

let shuffledQuestions, currentQuestionIndex
let questionsAnsweredCorrect = 0

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  undisableButtons()
  setNextQuestion()
})

function getShuffledQuestions() {
  const popped = questions.pop()
  const questionsShuffled = questions.sort(() => Math.random() - 0.5)
  questionsShuffled.push(popped)
  return questionsShuffled
}

// gör så att spelet kan starta när man trycker på start knappen

function startGame() {
  startButton.classList.add("hide")
  /**
   * det här sätter frågorna så att dom kommer i en viss ordning
   */

  shuffledQuestions = getShuffledQuestions()
  currentQuestionIndex = 0
  questionContainerElement.classList.remove("hide")
  setNextQuestion()
}

function setNextQuestion() {

  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  explanationText.innerText = question.explanation
  question.answers.forEach((answer) => {
    const button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  ytsfudtusy = false
  clearStatusClass(document.body)
  nextButton.classList.add("hide")
  explanationText.classList.add("hide")
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  if (ytsfudtusy === false) {
    ytsfudtusy = true

    const selectedButton = e.target
    if (selectedButton.disabled) {
      return
    }
    const correct = selectedButton.dataset.correct != null ? true : false
    console.log(correct)
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct)
    })
    disableButtons()
    if (correct === true) {
      questionsAnsweredCorrect += 1
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide")
      explanationText.classList.remove("hide")
    } else {
      startButton.innerText = "Complete"
      startButton.classList.remove("hide")
      startButton.removeEventListener("click", startGame)
      startButton.addEventListener("click", () => {
        let message = `${questionsAnsweredCorrect.toString()} out of ${shuffledQuestions.length}`
        location.assign("/games/imgquest/quiz/finish.html?correct=" + message)
      })
    }
  }

  console.log(questionsAnsweredCorrect)
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct")
  element.classList.remove("wrong")
}

// questions

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
      { text: "5", correct: false },
      { text: "2.222222224", correct: false }
    ],
    explanation: ""
  },
  {
    question: "What is 4 × 2?",
    answers: [
      { text: "16", correct: false },
      { text: "8", correct: true },
      { text: "8.1", correct: false },
      {
        text: "4.2",
        correct: false
      }
    ],
    explanation: ""
  },
  {
    question: "Is 8.1 equal to 9?",
    answers: [
      { text: "Yes", correct: false },
      { text: "No", correct: true }
    ],
    explanation: ""
  },
  {
    question: "What does OS stand for?",
    answers: [
      { text: "Open Software", correct: false },
      { text: "Operating System", correct: true },
      { text: "Open Source", correct: false },
      { text: "Oh Spot", correct: false }
    ],
    explanation: "OS stands for Operating System."
  },
  {
    question: "The MOV file extension refers what kind of file?",
    answers: [
      { text: "Video file", correct: true },
      { text: "Movie file", correct: true },
      { text: "Image file", correct: false },
      { text: "Motor-operated valve file", correct: false }
    ],
    explanation: "Specifically, it is called the QuickTime Video Format. Movies are a kind of video, so that answer is correct, too."
  },
  {
    question: "What is the binary number of 10?",
    answers: [
      { text: "1010", correct: true },
      { text: "1100", correct: false },
      { text: "1011", correct: false },
      { text: "1111", correct: false }
    ],
    explanation: "The first place from the right is the 1s. There are 0 1s. Then there's the 2s and there's one 2. And then no 4s, and then one eight. So 2 + 8 = 10."
  },
  {
    question: "What is three fifths of 100?",
    answers: [
      { text: "3", correct: false },
      { text: "5", correct: false },
      { text: "60", correct: true },
      { text: "10", correct: false }
    ],
    explanation: "One fifth of 100 is 20. So 20 * 3 is 3/5, so the answer is 60."
  },
  {
    question: "How many years are in a decade?",
    answers: [
      { text: "11", correct: false },
      { text: "15", correct: false },
      { text: "17", correct: false },
      { text: "10", correct: true }
    ],
    explanation: "The prefix dec- means ten. However, December isn't the tenth month, but, a long time ago, it used to be; January and February used to be after December."
  },
  {
    question: `What is the output of the following Python code: print('Hello'[::-1])?`,
    answers: [
      { text: "Hello", correct: false },
      { text: "olleH", correct: true },
      { text: "'Hello'[::-1]'", correct: false },
      { text: "-1", correct: false }
    ],
    explanation: '[::-1] reverses the string "Hello" and changes it to olleH.'
  },
  {
    question: "What is the next prime number after 7?",
    answers: [
      { text: "15", correct: false },
      { text: "11", correct: true },
      { text: "9", correct: false },
      { text: "17", correct: false }
    ],
    explanation: "Nine is divisible by three. The next biggest number that is an answer here, eleven, is not divisible by anything except one and itself, so it is the correct answer."
  },
  {
    question: "How many vertices are present on a cube?",
    answers: [
      { text: "8", correct: true },
      { text: "11", corect: false },
      { text: "9", correct: false },
      { text: "4", correct: false }
    ],
    explanation: ""
  },
  {
    question: "What gets sharper the more you use it?",
    answers: [
      { text: "A pencil", correct: false },
      { text: "Your brain", correct: true },
      { text: "A needle", correct: false },
      { text: "Your nails", correct: false }
    ],
    explanation: "*Metaphorically"
  },
  {
    question: "Who is the founder of Amazon?",
    answers: [
      { text: "Bill Gates", correct: false },
      { text: "Jeff Bezos", correct: true }
    ],
    explanation: ""
  },
  {
    question: "What phobia is the fear of fun?",
    answers: [
      { text: "Phobophobia", correct: false },
      { text: "Cherophobia", correct: true },
      { text: "Hilarophobia", correct: false },
      { text: "Funophobia", correct: false }
    ],
    explanation: "Science always chooses the most unexpected names!"
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "High Text Markup Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
      { text: "How to Make Lemonade", correct: false },
      { text: "Html To Make Language", correct: false }
    ],
    explanation: ""
  },
  {
    question: "Is three a perfect square?",
    answers: [
      { text: "Yes", correct: false },
      { text: "No", correct: true }
    ],
    explanation: "No, it's the exponent to cube something."
  },
  {
    question: "Who founded Rafdo (by first name)?",
    answers: [
      { text: "The Nimble Pimple", correct: false },
      { text: "Raffy", correct: false },
      { text: "Fox", correct: true },
      { text: "Hegira", correct: false }
    ],
    explanation: "Fox founded Rafdo. And Fox is me, who's making this. XD"
  },
  {
    question: "Which US state has been an independent country at one point for over 11 years?",
    answers: [
      { text: "Texas", correct: false },
      { text: "Vermont", correct: true },
      { text: "Minnesota", correct: false },
      { text: "California", correct: false }
    ],
    explanation: "Texas was only independent for 9-10 years. Vermont was independent for 14 years, albeit without diplomatic recognition."
  },
  {
    question: "What is the official name of Ivory Coast (the country)",
    answers: [
      { text: "Republic of Ivory Coast", correct: false },
      { text: "Ivory Coast Country", correct: false },
      { text: "Republic of Côte d'Ivoire", correct: true },
      { text: "Côte des Esclaves d'Afrique de l'Ouest", correct: false }
    ],
    explanation: "Côte d'Ivoire is Ivory Coast in French."
  },
  {
    question: "What is the chemical symbol for Gold?",
    answers: [
      { text: "Gd", correct: false },
      { text: "Ag", correct: false },
      { text: "Go", correct: false },
      { text: "Au", correct: true }
    ],
    explanation: "Au stands for aurum, which is gold in Latin."
  },
  {
    question: "Which one of these is not a famous tech person?",
    answers: [
      { text: "Steve Wozniak", correct: false },
      { text: "Dennis Ritchie", correct: false },
      { text: "Richard Stallman", correct: false },
      { text: "Grace Hopper", correct: false },
      { text: "Kevin Mitnick", correct: false },
      { text: "Christopher Zeckhauser", correct: true },
      { text: "Linus Torvalds", correct: false },
      { text: "John Carmack", correct: false }
    ],
    explanation: "I made him up. (actually ThioJoe did and I just stole this question)"
  },
  {
    question: "Who was never a US president?",
    answers: [
      { text: "Millard Fillmore", correct: false },
      { text: "Rutherford B. Hayes", correct: false },
      { text: "Alexander Hamilton", correct: true },
      { text: "John Tyler", correct: false }
    ],
    explanation: "Despite what people think, Alexander Hamilton was never a US president. However, he was one of the founding fathers and the first secretary of the treasury, and is on the ten-dollar bill."
  },
  {
    question: "What is 16 divided by 2?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "4", correct: false },
      { text: "2", correct: false }
    ],
    explanation: "Eight times two equals sixteen, which means that sixteen divided by two equals eight."
  },
  {
    question: "Is ImageQuest cool?",
    answers: [
      { text: "Yes", correct: true },
      { text: "No", correct: true }
    ],
    explanation: "Thanks for playing Quest 9!"
  }
]

console.log(questions.length)
