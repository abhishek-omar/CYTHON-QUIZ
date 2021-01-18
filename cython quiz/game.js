
// game.css file
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');

let score = 0
let questionCounter = 0
let availableQuestions = []
let currentQuestion = {}
let acceptingAnswers = true

let aques=10

let questions = [
    {
        question: '"Tutorials Point"[100:200]?',
        choice1: 'Index error.',
        choice2: '" "',
        choice3: 'Tutorials Point',
        choice4: ' Syntax error',
        answer: 2,
    },
    {
        question:
            "Which module is used in python to create Graphics?",
        choice1: "Turtle",
        choice2: "Canvas",
        choice3: "Tkinter",
        choice4: "Graphics",
        answer: 1,
    },
    {
        question: "Syntax error in python is detected by _________at _______",
        choice1: "compiler/ compile time",
        choice2: "interpreter/ run time",
        choice3: "compiler/ run time",
        choice4: "interpreter/ compile time",
        answer: 2,
    },
    {
        question: "Select the correct function among them which can be used to write the data to perform for a binary output?",
        choice1: "Write",
        choice2: "Output.binary",
        choice3: "Binary.output",
        choice4: "Dump",
        answer: 4,
    },
    {
        question: "Which code can be used as an input dialog named ''Is this a character?",
        choice1: "Tkinter.messagebox.showinfo(''showinfo'' , ''Is this a character? '')",
        choice2: "Tkinter.messagebox.showwarning(''showwarning'' , ' 'Is this a character? '')",
        choice3: "Tkinter.messagebox.showerror(''showerror'' , ''Is this a character? '')",
        choice4: "Tkinter.messagebox.askyesno(''askyesno'' , ''Is this a character? '')",
        answer: 4,
    },
    {
        question: " class is a _______ ",
        choice1: "template ",
        choice2: " blue print",
        choice3: "both a and b",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "Which of the following is not a type of inheritance??",
        choice1: "Double-level",
        choice2: "Multi-level ",
        choice3: "Single-level",
        choice4: "Multiple",
        answer: 1,
    },
    {
        question: "What is delattr(obj,name) used for?",
        choice1: "To print deleted attribute ",
        choice2: "To delete an attribute",
        choice3: " To check if an attribute is deleted or not",
        choice4: "To set an attribute",
        answer: 2,
    },
    {
        question: "The assignment of more than one function to a particular operator is _______ ",
        choice1: "Operator over-assignment",
        choice2: "Operator overriding",
        choice3: "Operator overloading",
        choice4: " Operator instance",
        answer: 3,
    },
    {
        question: "A C variable cannot start with",
        choice1: "An alphabet",
        choice2: "A number",
        choice3: "A special symbol other than underscore",
        choice4: "both (b) and (c)",
        answer: 4,
    },
    {
        question: "Which of the following statements about functions is false?",
        choice1: "The main() function can be called recursively",
        choice2: "Functions cannot return more than one value at a time",
        choice3: "A function can have multiple return statements with different return values",
        choice4: "The maximum number of arguments a function can take is 128",
        answer: 4,
    },
    {
        question: "What is the correct way of treating 9.81 as a long double?",
        choice1: "9.81L",
        choice2: "9.81LD",
        choice3: "9.81D",
        choice4: "9.81DL",
        answer: 1,
    },
    {
        question: "What is the range of double data type for a 16-bit compiler?",
        choice1: "-1.7e-328 to +1.7e-328",
        choice2: "-1.7e-348 to +1.7e-348",
        choice3: "-1.7e-308 to +1.7e-308",
        choice4: "-1.7e-328 to +1.7e-328",
        answer: 3,
    },
    {
        question: "Which function would you use to convert 1.98 to 1?",
        choice1: "ceil()",
        choice2: "floor()",
        choice3: "fabs()",
        choice4: "abs()",
        answer: 1,
    },
    {
        question: "Which of the following has a global scope in the program?",
        choice1: "Formal parameters",
        choice2: "Constants",
        choice3: "Macros",
        choice4: "Local variables",
        answer: 3,
    },
    {
        question: "Identify the C compiler of UNIX.",
        choice1: "gcc",
        choice2: "cc",
        choice3: "Borland",
        choice4: "vc++",
        answer: 2,
    },
    {
        question: "Which of the following is used in mode string to open the file in binary mode?",
        choice1: "a",
        choice2: "b",
        choice3: "B",
        choice4: "bin",
        answer: 2,
    },
    {
        question: "Choose the function that is most appropriate for reading in a multi-word string?",
        choice1: "strnset()",
        choice2: "scanf()",
        choice3: "strchr()",
        choice4: "gets()",
        answer: 4,
    },
    {
        question: "Which of the following is a logical NOT operator?",
        choice1: "!",
        choice2: "&&",
        choice3: "&",
        choice4: "All of the above",
        answer: 1,
    },
]


const MAX_QUESTIONS = 10

const MIN_Q = 0

const SCORE_POINTS = 100

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS-1) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()