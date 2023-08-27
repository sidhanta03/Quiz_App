const question=[
{
    question: "which is largest animal in the world?",
    answer:[
        {text:"shark",correct: false},
        {text:"blue whale",correct: true},
        {text:"Elephant",correct: false},
        {text:"Giraffe",correct:false},
    ] 
},

{
    question: "which is the smallest country in the world?",
    answer:[
        {text:"Vatican  city",correct: true},
        {text:"Bhutan",correct: false},
        {text:"Nepal",correct: false},
        {text:"Shrilanka",correct:false},
    ]

},
{
    question: "which is the largest desert in the world?",
    answer:[
        {text:"Kalahari",correct: false},
        {text:"Gobi",correct: false},
        {text:"Sahara",correct: false},
        {text:"Antarctica",correct:true},
    ]
},
{
    question: "which is the smallest contient in the world?",
    answer:[
        {text:"Asia",correct: false},
        {text:"Austrila",correct: true},
        {text:"Arctic",correct: false},
        {text:"Africa",correct:false},
    ]
}
];

// ... (your question array remains the same)

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = question[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
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
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
