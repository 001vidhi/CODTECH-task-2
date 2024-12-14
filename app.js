const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "O₂", correct: false },
            { text: "H₂O", correct: true },
            { text: "CO₂", correct: false },
            { text: "NaCl", correct: false },
        ]
    },
    {
        question: "Which organ pumps blood in the human body?",
        answers: [
            { text: "Brain", correct: false },
            { text: "Heart", correct: true },
            { text: "Liver", correct: false },
            { text: "Kidney", correct: false },
        ]
    },
    {
        question: "What do bees make?",
        answers: [
            { text: "Milk", correct: false },
            { text: "Honey", correct: true },
            { text: "Sugar", correct: false },
            { text: "Juice", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
        ]
    },
    
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style Sheets", correct: false },
            { text: "Custom Style Sheets", correct: false },
        ]
    },
    {
        question: "What is the value of π (pi) approximately?",
        answers: [
            { text: "3.12", correct: false },
            { text: "3.14", correct: true },
            { text: "3.16", correct: false },
            { text: "3.18", correct: false },
        ]
    },
    {
        question: "What is the fastest land animal?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Horse", correct: false },
            { text: "Leopard", correct: false },
        ]
    },
    {
        question: "Which planet is closest to the Sun?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Venus", correct: false },
            { text: "Mercury", correct: true },
            { text: "Mars", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();
