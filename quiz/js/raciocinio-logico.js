const form = document.querySelector(`#main-form`)
const displayContent = document.querySelector(`.textDisplay`)
const correctionParagraphs = Array.from(document.querySelectorAll(`.correctionParagraph`))
const correctAternatives = Array.from(document.querySelectorAll(`[data-feedback="correctAnswer"]`))
let score = 0

const getCorrectAnswers = () => {
    let correctAnswers = []
    correctAternatives.forEach(alternative => {
        correctAnswers.push(alternative.value)
    })
    return correctAnswers
}

const getUserAnswers = () => {
    let userAnswers = []
    correctAternatives.forEach((_, index) => {
        const UserAnswer = form[`inputQuestion${index}`].value
        userAnswers.push(UserAnswer)
    })
    return userAnswers
}

const getAnswerEvaluation = (fistArray, secondArray, index) => {
    return fistArray[index] === secondArray[index]
}

const setParagraphFeedback = (paragraph, className) => {
    paragraph.parentElement.setAttribute(`class`, className)
    paragraph.style.display = "block"
}

const answers = {
    userAnswers: [],
    correctAnswers: []
}

const animateFinalResult = () => {
    let counter = 0
    const timer = setInterval(() => {
        if (counter === score) {
            clearInterval(timer)
        }
        displayContent.innerHTML = `você acertou <em>${counter++}</em>%`
    }, 20)
    scrollTo({
        top: 170,
        left: 0,
        behavior: "smooth"
    })
}

const setCorrectionFeedback = ({ userAnswers, correctAnswers }) => {

    correctionParagraphs.forEach((correctionParagraph, index) => {
        userAnswers = getUserAnswers()
        correctAnswers = getCorrectAnswers()
        const userGotQuestionRight = getAnswerEvaluation(correctAnswers, userAnswers, index)

        if (userGotQuestionRight) {
            setParagraphFeedback(correctionParagraph, `success`)
            score += 10
            return
        }
        setParagraphFeedback(correctionParagraph, `error`)
    })
}
const resetUserScore = () => score = 0

form.addEventListener(`submit`, event => {
    event.preventDefault()
    resetUserScore()
    setCorrectionFeedback(answers)
    animateFinalResult()

})


