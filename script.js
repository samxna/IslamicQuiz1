const questions = [
    {
        question: "How many pillars does Islam have?",
        answers: [
            { text: "8", correct: false},
            { text: "5", correct: true},
            { text: "6", correct: false},
            { text: "9", correct: false},
        ]
    },
    {
        question: "Who is the first prophet in Islam?",
        answers: [
            { text: "Prophet Adam (A.S)", correct: true},
            { text: "Prophet Nuh (A.S)", correct: false},
            { text: "Prophet Muhammed (S.A.W)", correct: false},
            { text: "Prophet Ibrahim (A.S)", correct: false},
        ]
    },
    {
        question: "In which month was the Holy Quran revealed?",
        answers: [
            { text: "Safar", correct: false},
            { text: "Shawwal", correct: false},
            { text: "Dhul Hijjah", correct: false},
            { text: "Ramadan", correct: true},
        ]
    },
    {
        question: "What age did prophet Muhammed (S.A.W) die?",
        answers: [
            { text: "45", correct: false},
            { text: "63", correct: true},
            { text: "21", correct: false},
            { text: "79", correct: false},
        ]
    },
    {
        question: "Which is the smallest surah of the Quran?",
        answers: [
            { text: "Al-Asr", correct: false},
            { text: "Al-Ikhlaas", correct: false},
            { text: "An-Nasr", correct: false},
            { text: "Al-Kawthar", correct: true},
        ]
    }   
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
